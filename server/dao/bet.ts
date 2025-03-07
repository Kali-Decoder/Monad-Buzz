
import mongoose, { Schema, Document } from 'mongoose';
export interface IBet extends Document {
  _id: Schema.Types.ObjectId;
  market: string; // Market ID reference
  user: string; // User address
  amount: number;
  targetScore: number;
  claimedAmount: number;
  claimed: boolean;
  createdAt: Date;
}

const BetSchema: Schema = new Schema(
  {
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true }, // Reference to the market
    user: { type: String, required: true, ref: 'User' }, // User's wallet address
    amount: { type: Number, required: true }, // Bet amount
    targetScore: { type: Number, required: true }, // Predicted score (e.g., engagement metric)
    claimedAmount: { type: Number, default: 0 }, // Amount claimed by the user after resolution
    claimed: { type: Boolean, default: false }, // Whether the user has claimed the winnings
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IBet>('Bet', BetSchema);
