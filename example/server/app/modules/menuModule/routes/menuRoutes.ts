// modules/menu/routes/menuRoutes.ts
import { Router } from 'express';
import menuController from '../controllers/menuController';

const router: Router = Router();

// Create a new Menu or Submenu
router.post('/', menuController.createMenu);

// Get all menus for a workspace
router.get('/:workspaceId', menuController.getAllMenus);

// Get a specific menu by ID
router.get('/menu/:menuId', menuController.getMenuById);

// Update a menu
router.put('/menu/:menuId', menuController.updateMenu);

// Delete a menu and its submenus
router.delete('/menu/:menuId', menuController.deleteMenu);

// Get submenus of a specific menu
router.get('/menu/:menuId/submenus', menuController.getSubMenus);

export default router;
