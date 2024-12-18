// src/plugins/settingsPlugin/settingsPluginController.ts
import { Request, Response } from 'express';
import SettingsPluginService from '../services/settingsService';

class SettingsPluginController {
  // Install settings plugin to the workspace
  async installSettingsPlugin(req: Request, res: Response) {
    const { workspaceId } = req.body;
    try {
      const workspace = await SettingsPluginService.installSettingsPlugin(workspaceId);
      res.status(200).json(workspace);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Edit workspace settings (name, description)
  async editWorkspaceSettings(req: Request & any, res: Response) {
    const { workspaceId, name, description } = req.body;
    const userId: any = req.user._id; // Assuming user ID is in the request body
    try {
      const workspace = await SettingsPluginService.editWorkspaceSettings(userId, workspaceId, { name, description });
      res.status(200).json(workspace);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new SettingsPluginController();
