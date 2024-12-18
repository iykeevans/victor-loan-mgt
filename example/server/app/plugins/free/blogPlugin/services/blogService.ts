// services/blogService.ts
import BlogPost, { IBlogPost } from '../model/blogPost';
import Category from '../model/category';

export class BlogService {
  // Get a list of blog posts
  async getBlogPosts(): Promise<IBlogPost[]> {
    return await BlogPost.find().populate('category').exec();
  }

  // Get a single blog post by ID
  async getBlogPost(id: string): Promise<IBlogPost | null> {
    return await BlogPost.findById(id).populate('category').exec();
  }

  // Create a new blog post
  async createBlogPost(data: Partial<IBlogPost>): Promise<IBlogPost> {
    const blogPost = new BlogPost(data);
    return await blogPost.save();
  }

  // Update a blog post
  async updateBlogPost(id: string, data: Partial<IBlogPost>): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Create a category
  async createCategory(data: { name: string; description: string }) {
    const category = new Category(data);
    return await category.save();
  }
}
