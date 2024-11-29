import { Schema, model } from 'mongoose';
import { Types } from 'mongoose';
const planSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  //Plan Max limit e.g., 100 API calls if dealing with api as a service  or 10,000 users per plan
  maxLimit: { type: Number, required: true }, 
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'annually'], required: true },
  cost: { type: Number, required: true }, // In USD or any currency
  status: { type: String, required: true,enum: ['inactive', 'active'], default: "active" },
  maxUsers: {
    type: Number ,
    // required: true,
    min: 1,  // Ensure at least 1 user is allowed
    default: 1
},
maxWorkspaces: {
  default: 1,
    type: Number,
    // required: true,
    min: 1,  // Ensure at least 1 workspace is allowed
},


}, { timestamps: true });

const Plan = model('Plan', planSchema);

export default Plan;
