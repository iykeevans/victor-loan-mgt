// modules/menu/controllers/menuController.ts
import { Request, Response } from 'express';
import menuService from '../services/menuService';

const menuController = {
  // Create a new Menu (or Submenu)
  createMenu: async (req: Request, res: Response) => {
    try {
      const { name, workspaceId, url, parentMenuId } = req.body;
      const menu = await menuService.createMenu(name, workspaceId, url, parentMenuId || null);
      res.status(201).json({ menu });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all menus for a workspace
  getAllMenus: async (req: Request, res: Response) => {
    try {
      const { workspaceId } = req.params;
      const menus = await menuService.getAllMenus(workspaceId);
      res.status(200).json({ menus });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get a specific menu by ID
  getMenuById: async (req: Request, res: Response) => {
    try {
      const { menuId } = req.params;
      const menu = await menuService.getMenuById(menuId);
      res.status(200).json({ menu });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update a menu (or submenu)
  updateMenu: async (req: Request, res: Response) => {
    try {
      const { menuId } = req.params;
      const { name, url, parentMenuId } = req.body;
      const updatedMenu = await menuService.updateMenu(menuId, name, url, parentMenuId || null);
      res.status(200).json({ updatedMenu });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a menu and its submenus
  deleteMenu: async (req: Request, res: Response) => {
    try {
      const { menuId } = req.params;
      const deletedMenu = await menuService.deleteMenu(menuId);
      res.status(200).json({ deletedMenu });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get submenus of a parent menu
  getSubMenus: async (req: Request, res: Response) => {
    try {
      const { menuId } = req.params;
      const submenus = await menuService.getSubMenus(menuId);
      res.status(200).json({ submenus });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default menuController;
