import { Schema, model, Document } from 'mongoose';
import bcrypt from "bcrypt"
import mongoose, { ObjectId } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  scope: string;
  state: string;
  userID: string;
  sessionExpiresAt: Date;
  otp: string;
  otpExpiresAt: Date;
  isVerified: boolean;
  apiKey: string;
  lastApiCall: Date;
  lastApiCallCount: number;
  roles: mongoose.Types.ObjectId[];
  permissions: any[];
  subscriptions:  string[];
  userFunctions:mongoose.Types.ObjectId[];
  subscriptionExpiresAt: Date | null;
  workspaces: mongoose.Types.ObjectId[]; // Reference to workspaces the user is part of
  assignPermissions: ()=> void
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  scope: { type: String },
  state: { type: String },
  userID: { type: String, required: true },
  sessionExpiresAt: { type: Date, required: true },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },

  apiKey: { type: String, required: true }, // API key
  subscriptions: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Plan' }], // Reference to subscribed plans
  subscriptionExpiresAt: { type: Date }, // The expiration of the subscription (if applicable)
  lastApiCall: { type: Date },
  lastApiCallCount: { type: Number, required: true, default: 0 },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],  // User has roles
  permissions: [{ type: String }],  // You can store permissions here if needed
  workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  userFunctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserFunction' }]  // List of UserFunction references
}, { timestamps: true });

userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


// Add a method to the User schema to fetch permissions based on roles
userSchema.methods.assignPermissions = async function () {
  // Aggregate all permissions based on the roles assigned to the user
  const roles = await mongoose.model('Role').find({ '_id': { $in: this.roles } }).populate('permissions');
  this.permissions = roles.reduce((acc, role) => {
    return [...acc, ...role.permissions];
  }, []);
  await this.save();  // Save permissions to the user document
};

const User = model<IUser>('User', userSchema);

export default User;
