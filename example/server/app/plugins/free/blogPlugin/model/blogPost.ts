// models/blogPost.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
