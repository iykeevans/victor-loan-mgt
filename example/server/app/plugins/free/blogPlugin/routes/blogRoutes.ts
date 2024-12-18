// routes/blogRoutes.ts
import express from 'express';
import { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost } from '../controllers/blogController';

const router = express.Router();

// Routes for blog post management
router.get('/posts', getBlogPosts);
router.get('/posts/:id', getBlogPost);
router.post('/posts', createBlogPost);
router.put('/posts/:id', updateBlogPost);

export default router;
