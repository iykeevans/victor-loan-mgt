// seeder/seed.ts
import { BlogService } from '../services/blogService';
import { ICategory } from '../models/category';

const blogService = new BlogService();

export const seedBlogData = async () => {
  const techCategory: ICategory = {
    name: 'Technology',
    description: 'Articles related to technology.'
  };
  
  const category = await blogService.createCategory(techCategory);

  const blogPost = {
    title: 'Understanding Node.js',
    content: 'This is a beginner\'s guide to Node.js...',
    author: 'Admin',
    category: category._id
  };

  await blogService.createBlogPost(blogPost);

  console.log('Blog data seeded!');
};

seedBlogData().then(() => console.log('Blog data seeded successfully.'));
