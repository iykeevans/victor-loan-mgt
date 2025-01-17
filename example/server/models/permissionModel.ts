// src/models/Permission.ts
import mongoose, { Document, Schema } from 'mongoose';
import { Types } from 'mongoose';
export interface IPermission extends Document {
  name: string;
  description: string;
  _id: Types.ObjectId;
}

const permissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Permission = mongoose.model<IPermission>('Permission', permissionSchema);
export default Permission;
