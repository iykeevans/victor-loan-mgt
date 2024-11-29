import express from 'express';
import PageRoutes from './routes/pageRoutes';  // Importing routes
import Seeder from './seed';  // Optional: Seeder for the Page module

// This function will initialize the page module in the main Express app
export const setupPageModule = (app: express.Application) => {
  console.log('Setting up the Page Module...');

  // Register the page routes in the main app
  app.use('/api/pages', PageRoutes);

  // Optional: Run any necessary seeding (e.g., for development or initial setup)
  Seeder();

  console.log('Page Module setup completed.');
};
