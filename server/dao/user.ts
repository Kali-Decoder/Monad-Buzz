import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  address: string;
  isFaucetClaimed: boolean;
  points:Number;
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema: Schema = new Schema(
  {
    address: { type: String, required: true, unique: true },
    isFaucetClaimed: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
