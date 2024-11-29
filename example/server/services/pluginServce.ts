// src/services/pluginService.ts
import Plugin from '../models/pluginModel';
import Workspace from '../models/workspaceModel';
import { Types } from 'mongoose';

class PluginService {
  // Install a plugin
  async installPlugin(workspaceId: Types.ObjectId, pluginId: Types.ObjectId) {
    const workspace = await Workspace.findById(workspaceId).exec();
    const plugin = await Plugin.findById(pluginId).exec();

    if (!workspace || !plugin) {
      throw new Error('Workspace or Plugin not found');
    }

    // Check if the plugin is already installed
    const pluginInWorkspace = workspace.plugins.find(
      (p) => p.pluginId.toString() === pluginId.toString()
    );
    if (pluginInWorkspace?.installed) {
      throw new Error('Plugin is already installed');
    }

    // If the plugin is purchasable, verify if it has been purchased
    if (plugin.isPurchasable && !pluginInWorkspace?.purchased) {
      throw new Error('Plugin needs to be purchased before installation');
    }

    // Install the plugin
    workspace.plugins.push({
      pluginId,
      installed: true,
      purchased: plugin.isPurchasable ? pluginInWorkspace?.purchased : true,
    });

    await workspace.save();
    return workspace;
  }

  // Purchase a plugin
  async purchasePlugin(workspaceId: Types.ObjectId, pluginId: Types.ObjectId) {
    const workspace = await Workspace.findById(workspaceId).exec();
    const plugin = await Plugin.findById(pluginId).exec();

    if (!workspace || !plugin) {
      throw new Error('Workspace or Plugin not found');
    }

    // If the plugin is not purchasable, skip
    if (!plugin.isPurchasable) {
      throw new Error('Plugin is not purchasable');
    }

    // Update plugin status to purchased
    const pluginInWorkspace = workspace.plugins.find(
      (p) => p.pluginId.toString() === pluginId.toString()
    );

    if (!pluginInWorkspace) {
      throw new Error('Plugin is not installed');
    }

    pluginInWorkspace.purchased = true;
    await workspace.save();
    return workspace;
  }

  // Get all plugins
  async getAllPlugins() {
    return Plugin.find();
  }

  // Check if a plugin is free or purchased before usage
  async checkPluginAccess(workspaceId: string, pluginName: string, res: Response, next: NextFunction) {
    // Find the plugin by name
    const plugin = await Plugin.findOne({ name: pluginName }).exec();
    if (!plugin) {
      return res.status(404).json({ message: 'Plugin not found' });
    }

    // Find the workspace
    const workspace = await Workspace.findById(workspaceId).exec();
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if the plugin is installed in the workspace
    const pluginInWorkspace = workspace.plugins.find(p => p.pluginId.toString() === plugin._id.toString());
    if (!pluginInWorkspace) {
      return res.status(403).json({ message: 'Plugin is not installed in the workspace' });
    }

    // If the plugin is free or purchased, allow usage
    if (plugin.isPurchasable && pluginInWorkspace.purchased === false) {
      return res.status(403).json({ message: 'Plugin needs to be purchased before usage' });
    }

    // Otherwise, allow access to the plugin (free or purchased)
    next();
  }
}


export   async function checkPluginAccess(workspaceId: string, name: string, res: Response, next: NextFunction) {
  // Find the plugin by name
  const plugin = await Plugin.findOne({ name: name }).exec();
  if (!plugin) {
    return res.status(404).json({ message: 'Plugin not found' });
  }

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) {
    return res.status(404).json({ message: 'Workspace not found' });
  }

  // Check if the plugin is installed in the workspace
  const pluginInWorkspace = workspace.plugins.find(p => p.pluginId.toString() === plugin._id.toString());
  if (!pluginInWorkspace) {
    return res.status(403).json({ message: 'Plugin is not installed in the workspace' });
  }

  // If the plugin is free or purchased, allow usage
  if (plugin.isPurchasable && pluginInWorkspace.purchased === false) {
    return res.status(403).json({ message: 'Plugin needs to be purchased before usage' });
  }

  // Otherwise, allow access to the plugin (free or purchased)
  next();
}

export default new PluginService();












