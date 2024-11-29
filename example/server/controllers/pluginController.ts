// src/controllers/pluginController.ts
import { Request, Response } from 'express';
import PluginService from '../services/pluginServce';
import axios from 'axios'; // Using axios to make HTTP requests

class PluginController {
  // Install a plugin
  async installPlugin(req: Request, res: Response):Promise<any> {
    const { workspaceId, pluginId } = req.body;
    try {
      const workspace = await PluginService.installPlugin(workspaceId, pluginId);
      res.status(200).json(workspace);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Purchase a plugin
  async purchasePlugin(req: Request, res: Response):Promise<any> {
    const { workspaceId, pluginId } = req.body;
    try {
      const workspace = await PluginService.purchasePlugin(workspaceId, pluginId);
      res.status(200).json(workspace);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all plugins
  async getAllPlugins(req: Request, res: Response):Promise<any> {
    try {
      const plugins = await PluginService.getAllPlugins();
      res.status(200).json(plugins);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new PluginController();



// export const usePlugin = async (req: Request, res: Response) :Promise<any> => {
//   const { pluginName } = req.params;  // The name of the plugin (e.g., "workspaceSettings")
//   const workspaceId = req.workspaceId;  // The workspaceId from the request context

//   const pluginUrl = `http://localhost:3000/api/plugins/${pluginName}`;  // Assuming each plugin has a base route like /api/plugins/workspaceSettings

//   try {
//     // Forward the request to the corresponding plugin's API route
//     const pluginResponse = await axios({
//       method: req.method,  // Forward the original HTTP method (GET, POST, etc.)
//       url: `${pluginUrl}${req.url}`,  // Forward the original URL
//       headers: req.headers,  // Forward the headers, including authorization if needed
//       data: req.body,  // Forward the request body for POST/PUT requests
//       params: req.query,  // Forward query parameters
//     });

//     // Send back the response from the plugin
//     res.status(pluginResponse.status).json(pluginResponse.data);
//   } catch (error) {
//     // Handle errors if the plugin request fails
//     console.error('Error while forwarding the request to the plugin:', error);
//     res.status(500).json({ message: 'Internal server error while accessing plugin', error: error.message });
//   }
// };

