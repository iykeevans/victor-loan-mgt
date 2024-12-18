// models/category.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
