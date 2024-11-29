// modules/menu/seeder/menuSeeder.ts
import mongoose from 'mongoose';
import MenuModel from '../repository/menuRepository';
import { Workspace } from '../../../../models/workSpaceModel'; // Assuming you have a Workspace model

// Sample workspace ID (replace with an actual Workspace ID from your database)
const workspaceId: Workspace['_id'] = new mongoose.Types.ObjectId('60c72b2f9e5b7c5b7c51bcf4'); // Change to valid Workspace ID

const menuSeeder = async () => {
  try {
    // Delete all existing menus and submenus to start fresh
    await MenuModel.deleteMany({ workspaceId });

    // Create top-level menus
    const topLevelMenu1 = new MenuModel({
      name: 'Dashboard',
      workspaceId,
      url: '/dashboard',
      parentMenuId: null,
      order: 1,
    });

    const topLevelMenu2 = new MenuModel({
      name: 'Settings',
      workspaceId,
      url: '/settings',
      parentMenuId: null,
      order: 2,
    });

    await topLevelMenu1.save();
    await topLevelMenu2.save();

    // Create submenus under "Dashboard"
    const dashboardSubmenu1 = new MenuModel({
      name: 'Overview',
      workspaceId,
      url: '/dashboard/overview',
      parentMenuId: topLevelMenu1._id,
      order: 1,
    });

    const dashboardSubmenu2 = new MenuModel({
      name: 'Reports',
      workspaceId,
      url: '/dashboard/reports',
      parentMenuId: topLevelMenu1._id,
      order: 2,
    });

    await dashboardSubmenu1.save();
    await dashboardSubmenu2.save();

    // Create submenus under "Settings"
    const settingsSubmenu1 = new MenuModel({
      name: 'Profile',
      workspaceId,
      url: '/settings/profile',
      parentMenuId: topLevelMenu2._id,
      order: 1,
    });

    const settingsSubmenu2 = new MenuModel({
      name: 'Security',
      workspaceId,
      url: '/settings/security',
      parentMenuId: topLevelMenu2._id,
      order: 2,
    });

    await settingsSubmenu1.save();
    await settingsSubmenu2.save();

    // Create nested submenus (e.g., a submenu under "Security")
    const securitySubmenu = new MenuModel({
      name: 'Change Password',
      workspaceId,
      url: '/settings/security/change-password',
      parentMenuId: settingsSubmenu2._id,
      order: 1,
    });

    await securitySubmenu.save();

    console.log('Menu and Submenu Seeder executed successfully');
  } catch (error) {
    console.error('Error seeding menu data:', error);
  }
};

export default menuSeeder;
