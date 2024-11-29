// src/middleware/pluginAccessControl.ts

import { Request, Response, NextFunction } from 'express';
import Plugin, {IPlugin } from '../models/pluginModel';
import Workspace from '../models/workSpaceModel';
import User, { IUser } from '../models/userModel';
import { IRequestUser  } from './authMiddleware';
import {Config } from "../app/config/server.config"
const pluginAccessControl = async (req: Request  & IRequestUser, res: Response, next: NextFunction) => {
  const { pluginName } = req.params;
  const workspaceId = req.workSpaceId;  // Assuming workspaceId is added to the request
  
  // Find the workspace
  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) {
    return res.status(404).json({ message: 'Workspace not found' });
  }

  // Find the plugin
  const plugin: IPlugin & any = await Plugin.findOne({ name: pluginName }).exec();
  if (!plugin) {
    return res.status(404).json({ message: 'Plugin not found' });
  }

  // Check if the plugin is installed in the workspace
  const isPluginInstalled = workspace.plugins.includes(plugin._id);
  if (!isPluginInstalled) {
    return res.status(403).json({ message: 'Plugin is not installed for this workspace' });
  }

  // Check if the plugin requires a purchase and whether it has been purchased
  if (plugin.isPurchasable && !plugin.purchased) {
    return res.status(403).json({ message: 'Plugin needs to be purchased before usage' });
  }

  // Check if the user has permission to access the plugin (example: admin role)
  const userId  = req.userID;  // Assuming userId is added from authentication middleware
  const user : IUser & any = await User.findById(userId).exec();
  if (!user) {
    return res.status(403).json({ message: 'User not found' });
  }

  // Check for specific roles (example: admin-only)
  
  if (plugin.requiresAdmin && !Config.SUPER_USERS_ROLES.includes( user.role)  ) {
    return res.status(403).json({ message: 'Admin role required to access this plugin' });
  }

  // If all checks pass, proceed to the next middleware or route handler
  next();
};

export default pluginAccessControl;
