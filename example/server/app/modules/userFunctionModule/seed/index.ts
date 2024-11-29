// modules/setupSeeder.ts
import mongoose from 'mongoose';
import UserFunction from '../repository/userFunctionRepository';
import Category from '../repository/categoryRepository';
import Page from '../../pageModule/repository/pageRepository';


const workspaceId = new mongoose.Types.ObjectId('60c72b2f9e5b7c5b7c51bcf4'); // Example workspace ID

const seeder = async () => {
  try {
    // Seed Categories
    const category = new Category({
      name: 'Admin Functions',
      description: 'Functions related to admin actions',
      workspaceId,
    });
    await category.save();

    // Seed User Functions
    const userFunction1 = new UserFunction({
      name: 'Manage Users',
      description: 'Allows management of users in the workspace',
      workspaceId,
      categoryId: category._id,
      roles: ['admin', 'super-admin'],
    });

    const userFunction2 = new UserFunction({
      name: 'View Analytics',
      description: 'Allows viewing of workspace analytics',
      workspaceId,
      categoryId: category._id,
      roles: ['user', 'admin'],
    });

    await userFunction1.save();
    await userFunction2.save();

    // Seed Pages
    const page = new Page({
      name: 'User Management',
      content: '<h1>Manage users here</h1>',
      url: '/admin/users',
      workspaceId,
      userFunctions: [userFunction1._id],
    });

    await page.save();

    console.log('Seeder executed successfully');
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
};




export const seedCategories = async () => {
  try {
    const workspaceId = new mongoose.Types.ObjectId('60c72b2f9e5b7c5b7c51bcf4'); // Example Workspace ID

    const category1 = {
      name: 'Admin',
      description: 'Administrative tools and settings',
      workspaceId,
    };

    const category2 = {
      name: 'Analytics',
      description: 'Data analysis tools',
      workspaceId,
    };

    const category3 = {
      name: 'User Management',
      description: 'Category related to managing users',
      workspaceId,
    };

    // Create Categories
    await Category.create(category1);
    await Category.create(category2);
    await Category.create(category3);

    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding Categories:', error);
  }
};


export default seeder;









