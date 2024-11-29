// modules/exampleModule/setup.ts
import config from './config';
import { Application } from 'express';
import exampleRoutes from './routes/exampleRoutes';
import exampleMiddleware from './middlewares/exampleMiddleware';
import exampleService from './services/exampleService';

export default function setupModule(app: Application): void {
  if (config.featureEnabled) {
    console.log('Feature is enabled');
  }

  // Register middleware and routes
  app.use(exampleMiddleware);
  app.use('/example', exampleRoutes);

  // Initialize services
  exampleService.initialize();
}
