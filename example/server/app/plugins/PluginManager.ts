import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import Plugin from '../../models/pluginModel'; // Assume this is your plugin model
// plugins/pluginManager.ts


interface PluginRoute {
  method:  string; //'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: Function;
}



class PluginManager {
  private plugins: { [key: string]: PluginRoute[] } = {};

  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Registers a plugin's routes
  registerPluginRoutes(pluginName: string, routes: PluginRoute[]) {
    this.plugins[pluginName] = routes;
  }

  // getPlugin(pluginName: string): Plugin | undefined {
  //   return this.plugins.get(pluginName);
  // }

  
  // Register routes for all active plugins
  public registerPluginRoutesManually() {
    //Eg. Register Billing Plugin routes
 //   registerBillingRoutes(this.app);
//
    // Register other plugins as needed
    // e.g., registerAnotherPluginRoutes(this.app);
  }


}



  // Intercepts the plugin usage request and dynamically forwards the request to the correct route
  export async function  usePlugin(req: Request, res: Response, next: NextFunction) {
    const pluginName = req.params.pluginName;
    const app : any= [] //
    const plugins: any = new PluginManager(app)
    const pluginRoutes = plugins[pluginName];

    if (!pluginRoutes) {
      return res.status(404).json({ message: `Plugin ${pluginName} not found.` });
    }

    // Check plugin access control logic here (e.g., if plugin is free or purchased, permissions, etc.)
    const isPluginAvailable = await checkPluginAccess(pluginName, req);

    if (!isPluginAvailable) {
      return res.status(403).json({ message: `Access to plugin ${pluginName} is blocked.` });
    }

    // Forward the request to the correct route handler
    const matchedRoute = pluginRoutes.find( (route: any) => {
      return req.method.toLowerCase() === route.method && req.path === route.path;
    });

    if (matchedRoute) {
      return matchedRoute.handler(req, res, next);
    } else {
      return res.status(404).json({ message: `Route ${req.path} not found for plugin ${pluginName}` });
    }
  }

  // Simulate access control logic for the plugin
  export  async function checkPluginAccess(pluginName: string, req: Request) {
    const plugin = await Plugin.findOne({ name: pluginName });

    if (plugin && plugin.isPurchasable && !plugin.purchased) {
      // Logic for checking purchase status, user permissions, etc.
      return false; // Block access if plugin is purchasable but not bought
    }

    return true; // Allow access if plugin is free or already purchased
  }
export default   PluginManager //new PluginManager();


















