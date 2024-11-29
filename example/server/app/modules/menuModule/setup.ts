// modules/menu/setup.ts
import { Application } from 'express';
import menuRoutes from './routes/menuRoutes';


// This function will initialize the page module in the main Express app
export const setupMenuModule = (app: Application) => {
  console.log('Setting up the Menu Module...');

  // Register the page routes in the main app
  app.use('/api/menus', menuRoutes);


  console.log('Page Module setup completed.');
};
