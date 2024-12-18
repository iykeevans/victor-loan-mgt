import { Request, Response } from 'express';
import pluginManager from '../../PluginManager';
import settingsController from './controller/settingsController';
import { getWokSpaceDetail } from "../../../../controllers/workSpaceController"
const workspaceSettingsRoutes = [
  {
    method: 'get',
    path: '/workspace/details',
    handler: getWokSpaceDetail 
    // (req: Request, res: Response) => {
    //   // Fetch workspace details logic
    //   res.status(200).json({ message: 'Workspace details fetched successfully.' });
    // }
  },
  {
    method: 'put',
    path: '/workspace/edit', 
    handler: settingsController.editWorkspaceSettings
    // (req: Request, res: Response) => {
    //   // Update workspace details logic
    //   res.status(200).json({ message: 'Workspace details updated successfully.' });
    // }
  }
];

// Register routes in Plugin Manager
pluginManager.registerPluginRoutes('workspaceSettings', workspaceSettingsRoutes);
