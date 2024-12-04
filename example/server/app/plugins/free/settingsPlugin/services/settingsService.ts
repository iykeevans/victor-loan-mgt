// src/plugins/settingsPlugin/settingsPluginService.ts
import Workspace from '../../../../models/workSpaceModel';
import User from '../../../../models/userModel';
import SettingsPlugin from '../model/settingsModel';
import { Types } from 'mongoose';

class SettingsPluginService {
  // Enable the settings plugin for a workspace
  async installSettingsPlugin(workspaceId: Types.ObjectId) {
    const workspace = await Workspace.findById(workspaceId).exec();
    if (!workspace) throw new Error('Workspace not found');

    const plugin = await SettingsPlugin.findOne({ name: 'Settings Plugin' }).exec();
    if (!plugin) throw new Error('Settings Plugin not found');

    workspace.plugins.push({
      pluginId: plugin._id,
      installed: true,
      purchased: false, // assuming the plugin is free for now
    });

    await workspace.save();
    return workspace;
  }

  // Check if the user is an admin or owner of the workspace
  private async isUserAdminOrOwner(userId: Types.ObjectId, workspaceId: Types.ObjectId): Promise<boolean> {
    const workspace = await Workspace.findById(workspaceId).exec();
    if (!workspace) throw new Error('Workspace not found');

    const user = await User.findById(userId).exec();
    if (!user) throw new Error('User not found');

    return workspace.ownerId.toString() === userId.toString() || user.role === 'ADMIN';
  }

  // Edit workspace settings (name, description)
  async editWorkspaceSettings(userId: Types.ObjectId, workspaceId: Types.ObjectId, newSettings: { name: string, description: string }) {
    const isAuthorized = await this.isUserAdminOrOwner(userId, workspaceId);
    if (!isAuthorized) throw new Error('User is not authorized to edit workspace settings');

    const workspace = await Workspace.findById(workspaceId).exec();
    if (!workspace) throw new Error('Workspace not found');

    workspace.name = newSettings.name;
    workspace.description = newSettings.description;

    await workspace.save();
    return workspace;
  }
}

export default new SettingsPluginService();
