import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  paymentMethod: "fiat" | "crypto";
  cryptoType?: string;
  isAnonymous: boolean;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

const DonationSchema: Schema = new Schema({
  donorName: { type: String, default: "Anonymous" },
  email: { type: String, required: false },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  paymentMethod: { type: String, enum: ["fiat", "crypto"], required: true },
  cryptoType: { type: String, required: false },
  isAnonymous: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);
