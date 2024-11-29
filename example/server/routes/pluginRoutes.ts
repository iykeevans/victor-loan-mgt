// src/routes/pluginRoutes.ts
import express from 'express';
import PluginController from '../controllers/pluginController';
// import {pluginManagerMiddleware } from "../middlewares/authMiddleware"

import pluginAccessControl from '../middlewares/pluginAccessControlMiddleware';
// import { usePlugin } from '../controllers/pluginController'; // The controller that handles actual plugin functionality
import pluginManager, {usePlugin} from '../app/plugins/PluginManager';


const router = express.Router();

// Route to install a plugin
router.post('/install', PluginController.installPlugin);
router.post('/purchase', PluginController.purchasePlugin);
router.get('/', PluginController.getAllPlugins);


// // Route to access a plugin (this will be intercepted by the Plugin Manager)
// router.get('/use/:workspaceId/:pluginName', pluginManagerMiddleware, (req, res) => {
//   res.status(200).json({ message: 'Access granted to the plugin' });
// });


// Route to use a plugin, requires access control middleware
router.get('/use/:pluginName', pluginAccessControl, usePlugin);


//with plugin register


// This will be used to dynamically route requests to the correct plugin
router.get('/use/:pluginName', (req, res, next) => usePlugin(req, res, next));
router.put('/use/:pluginName', (req, res, next) => usePlugin(req, res, next));


export default router;



