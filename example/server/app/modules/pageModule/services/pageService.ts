// src/modules/page/services/pageService.ts
import PageModel, { IPage } from '../repository/pageRepository';

// Create a new Page
export const createPage = async (workspaceId: string, parentMenuId: string | null, name: string, content: string, url: string) => {
  const page = new PageModel({
    name,
    content,
    url,
    parentMenuId: parentMenuId ? parentMenuId : null,
    workspaceId,
  });

  await page.save();
  return page;
};

// Get all Pages for a Workspace
export const getAllPages = async (workspaceId: string) => {
  const pages = await PageModel.find({ workspaceId }).exec();
  return pages;
};

// Get a Page by ID
export const getPageById = async (pageId: string) => {
  const page = await PageModel.findById(pageId).exec();
  if (!page) throw new Error('Page not found');
  return page;
};

// Update a Page
export const updatePage = async (pageId: string, name: string, content: string, url: string) => {
  const updatedPage = await PageModel.findByIdAndUpdate(pageId, { name, content, url }, { new: true }).exec();
  if (!updatedPage) throw new Error('Page not found');
  return updatedPage;
};

// Delete a Page
export const deletePage = async (pageId: string) => {
  const deletedPage = await PageModel.findByIdAndDelete(pageId).exec();
  if (!deletedPage) throw new Error('Page not found');
  return deletedPage;
};
