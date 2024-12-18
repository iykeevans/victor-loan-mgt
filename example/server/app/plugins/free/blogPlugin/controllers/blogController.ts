// controllers/blogController.ts
import { Request, Response } from 'express';
import { BlogService } from '../services/blogService';

const blogService = new BlogService();

// Get all blog posts
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await blogService.getBlogPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog posts.' });
  }
};

// Get a single blog post
export const getBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await blogService.getBlogPost(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog post.' });
  }
};

// Create a new blog post
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, author, category } = req.body;
    const newPost = await blogService.createBlogPost({ title, content, author, category });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog post.' });
  }
};

// Update a blog post
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await blogService.updateBlogPost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog post.' });
  }
};
