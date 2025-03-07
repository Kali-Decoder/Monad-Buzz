import mongoose, { Document, Schema } from 'mongoose';

export interface IReel extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  url: string;
  amount: number;
  tenure: number;
  like:number;
}

const ReelSchema: Schema<IReel> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  amount: { type: Number, default: 0 },
  tenure: { type: Number, default: 0 },
  like:{type: Number,default: 0 }
});

const Reel = mongoose.models.Reel || mongoose.model<IReel>('Reel', ReelSchema);
export default Reel;
