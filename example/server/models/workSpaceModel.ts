// src/models/Workspace.ts

import mongoose, { Schema, Document } from 'mongoose';
// roles will be dynmiclly created
// export enum UserRole {
//   OWNER = 'Super Admin',
//   ADMIN = 'Admin',
//   MEMBER = 'User',
// }
export interface IPlugin {
    pluginId:any;// mongoose.Types.ObjectId;  // plugins cn be purchased by organizations  free or paid
    purchased: boolean;
    installed: boolean;    
}
  

export interface Workspace extends Document {
  name: string;
  ownerId: mongoose.Types.ObjectId; // Reference to User (workspace creator)
  plan: mongoose.Types.ObjectId,
  description: string;
  plugins: IPlugin[];
  //  plugins: Array<{
//     pluginId: mongoose.Types.ObjectId;
//     purchased: boolean;
//     installed: boolean;
//   }>;
renewalStatus?: boolean;
licenseKey?: string;
licenseExpiryDate?: Date;
  members: {
    userId: mongoose.Types.ObjectId; // Reference to User
    role: UserRole;                   // Role in the workspace
  }[];
}

const workspaceSchema = new Schema<Workspace>({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
},
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      role: { type: String, /*enum: Object.values(UserRole),*/ required: true },
    },
  ],
  renewalStatus: { type: Boolean,  },
licenseKey: { type: String },
licenseExpiryDate: { type: Date},
 
  plugins: [
    {
      pluginId: { type: mongoose.Types.ObjectId, ref: 'Plugin' },
      purchased: { type: Boolean, default: false },
      installed: { type: Boolean, default: false },
    },
  ],
}, { timestamps: true });

export default mongoose.model<Workspace>('Workspace', workspaceSchema);








