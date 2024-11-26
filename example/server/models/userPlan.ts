import { Schema, model, Document } from 'mongoose';

// Define the structure for User Plan
interface IUserPlan extends Document {
  userId: string;
  planId: string;  // Plan ID references a Plan model
  status: 'active' | 'inactive'; // Status of the plan
  startDate: Date;
  endDate: Date;
  rateLimit: number;  // Rate limit for API usage
  frequency: 'daily' | 'weekly' | 'monthly' | 'annually';  // Billing cycle
}

const UserPlanSchema = new Schema<IUserPlan>({
  userId: { type: String, required: true },
  planId: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  rateLimit: { type: Number, required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'annually'], required: true },
}, { timestamps: true });

const UserPlan = model<IUserPlan>('UserPlan', UserPlanSchema);

export default UserPlan;
