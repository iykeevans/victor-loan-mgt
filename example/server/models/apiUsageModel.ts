import { Schema, model, Document } from 'mongoose';

interface IUserApiUsage extends Document {
  userId: string;
  apiCalls: number;
  lastReset: Date; // When the count was last reset (could be daily, weekly, etc.)
  frequency: 'daily' | 'weekly' | 'monthly'; // The frequency based on the user plan
}

const UserApiUsageSchema = new Schema<IUserApiUsage>({
  userId: { type: String, required: true },
  apiCalls: { type: Number, default: 0 },
  lastReset: { type: Date, default: Date.now },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
});

const UserApiUsage = model<IUserApiUsage>('UserApiUsage', UserApiUsageSchema);

export default UserApiUsage;
