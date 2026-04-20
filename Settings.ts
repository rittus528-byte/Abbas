import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  usdtAddress: string;
  btcAddress: string;
  ethAddress: string;
  targetGoal: number;
}

const SettingsSchema: Schema = new Schema({
  usdtAddress: { type: String, required: true, default: "0xPlaceholderUSDT" },
  btcAddress: { type: String, required: true, default: "bc1qPlaceholderBTC" },
  ethAddress: { type: String, required: true, default: "0xPlaceholderETH" },
  targetGoal: { type: Number, required: true, default: 1000000 },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
