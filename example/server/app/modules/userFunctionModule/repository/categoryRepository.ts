// models/categoryModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  workspaceId: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
