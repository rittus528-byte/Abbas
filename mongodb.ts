import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not defined in .env.local yet. Operating in disconnected/mock mode until set.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI || MONGODB_URI.includes("<username>")) {
    if (!(global as any).hasWarnedDB) {
      console.warn("MONGODB_URI is not set or contains placeholders. Operating in Disconnected/Mock Mode.");
      (global as any).hasWarnedDB = true;
    }
    return null;
  }
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail fast if can't connect
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Database connected successfully.");
        return mongoose;
      })
      .catch((err) => {
        console.error("Database connection failed:", err.message);
        cached.promise = null; // Allow retry on next request
        throw err;
      });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    return null; // Return null instead of throwing to allow API routes to handle "no DB" case
  }
  
  return cached.conn;
}

export default connectToDatabase;
