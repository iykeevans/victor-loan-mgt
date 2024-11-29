// src/modules/page/controllers/pageController.ts
import { Request, Response } from 'express';
import * as PageService from '../services/pageService';

// Create a Page
export const createPage = async (req: Request, res: Response) => {
  try {
    const { workspaceId, parentMenuId, name, content, url } = req.body;
    const newPage = await PageService.createPage(workspaceId, parentMenuId, name, content, url);
    res.status(201).json({ success: true, data: newPage });
  } catch (error : any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Pages for a Workspace
export const getAllPages = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.workspaceId;
    const pages = await PageService.getAllPages(workspaceId);
    res.status(200).json({ success: true, data: pages });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a Page by ID
export const getPageById = async (req: Request, res: Response) => {
  try {
    const pageId = req.params.pageId;
    const page = await PageService.getPageById(pageId);
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a Page
export const updatePage = async (req: Request, res: Response) => {
  try {
    const { name, content, url } = req.body;
    const pageId = req.params.pageId;
    const updatedPage = await PageService.updatePage(pageId, name, content, url);
    res.status(200).json({ success: true, data: updatedPage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Page
export const deletePage = async (req: Request, res: Response) => {
  try {
    const pageId = req.params.pageId;
    const deletedPage = await PageService.deletePage(pageId);
    res.status(200).json({ success: true, data: deletedPage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
