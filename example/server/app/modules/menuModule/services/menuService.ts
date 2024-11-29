// modules/menu/services/menuService.ts
import MenuModel from '../repository/menuRepository';
import { Workspace } from '../../../../models/workSpaceModel'; // Assuming you have a Workspace model

const menuService : any= {
  // Create a new Menu or Submenu
  createMenu: async (name: string, workspaceId: Workspace['_id'], url: string, parentMenuId: string | null = null) => {
    const menu = new MenuModel({ name, workspaceId, url, parentMenuId, order: 0 });
    await menu.save();
    return menu;
  },

  // Get all menus and submenus belonging to a workspace (with nested submenus)
  getAllMenus: async (workspaceId: Workspace['_id']) => {
    const menus = await MenuModel.find({ workspaceId }).sort({ order: 1 }).exec();
    return menus;
  },

  // Get a specific Menu by ID (can include nested submenus)
  getMenuById: async (menuId: string) => {
    const menu = await MenuModel.findById(menuId).exec();
    if (!menu) throw new Error('Menu not found');
    return menu;
  },

  // Update a menu (can be used for both top-level and submenus)
  updateMenu: async (menuId: string, name: string, url: string, parentMenuId: string | null = null) => {
    const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, { name, url, parentMenuId }, { new: true });
    if (!updatedMenu) throw new Error('Menu not found');
    return updatedMenu;
  },

  // Delete a menu (also deletes nested submenus)
  deleteMenu: async (menuId: string) => {
    // Deleting submenus recursively before deleting the menu
    await MenuModel.deleteMany({ parentMenuId: menuId });
    const menu = await MenuModel.findByIdAndDelete(menuId);
    if (!menu) throw new Error('Menu not found');
    return menu;
  },

  // Get nested submenus for a specific menu
  getSubMenus: async (parentMenuId: string) => {
    const submenus = await MenuModel.find({ parentMenuId }).sort({ order: 1 }).exec();
    return submenus;
  }
};

export default menuService;
