
import seeder from './seed';  // Importing the seeder

// modules/userFunction/userFunctionModule.ts
import express from 'express';
import userFunctionRoutes from './routes/userFunctionRoutes';
import categoriesRoutes from "./routes/categoryRoutes"
import seedUserFunctions, { seedCategories } from './seed';

export const userFunctionModule = (app: express.Application) => {
  console.log('Setting up User Function module...');

  // Set up routes for the User Function module
  app.use('/api/user-functions', userFunctionRoutes);
  app.use('/api/categories', categoriesRoutes);

    // Run seeder to populate some initial data
    seedUserFunctions();
    seedCategories()

  console.log('User Function module setup completed.');
};
