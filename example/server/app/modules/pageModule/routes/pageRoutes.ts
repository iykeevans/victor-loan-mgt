// src/modules/page/routes/pageRoutes.ts
import express from 'express';
import * as PageController from '../controllers/pageController';

const router = express.Router();

// Routes for Pages
router.post('/create', PageController.createPage);
router.get('/:workspaceId', PageController.getAllPages);
router.get('/:pageId', PageController.getPageById);
router.put('/:pageId', PageController.updatePage);
router.delete('/:pageId', PageController.deletePage);

export default router;
