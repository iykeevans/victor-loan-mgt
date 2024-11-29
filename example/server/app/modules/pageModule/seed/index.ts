import mongoose from 'mongoose';
import MenuModel from '../../menuModule/repository/menuRepository';
import PageModel from '../repository/pageRepository';

const workspaceId = new mongoose.Types.ObjectId('60c72b2f9e5b7c5b7c51bcf4'); // Example Workspace ID

const workspaceSeeder = async () => {
  try {
    // Create a Menu and a Submenu
    const menu = new MenuModel({
      name: 'Dashboard',
      workspaceId,
      url: '/dashboard',
      parentMenuId: null,
      order: 1,
    });

    await menu.save();

    // Create a page under this Menu
    const page = new PageModel({
      name: 'Overview',
      content: '<h1>Overview Content</h1>',
      url: '/dashboard/overview',
      parentMenuId: menu._id,
      workspaceId,
    });

    await page.save();

    console.log('Workspace and Page Seeder executed successfully');
  } catch (error) {
    console.error('Error seeding workspace and pages:', error);
  }
};

export default workspaceSeeder;
