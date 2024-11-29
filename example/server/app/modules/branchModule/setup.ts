// modules/companyBranch/setup.ts
import { Application } from 'express';
import branchRoutes from './routes/branchRoutes';

export default function setupModule(app: Application): void {
  // Register branch routes
  app.use('/api/branches', branchRoutes);
}
