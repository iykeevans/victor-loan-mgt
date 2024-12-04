// src/plugins/settingsPlugin/settingsPluginRoutes.ts
import express from 'express';
import SettingsPluginController from './controller/settingsController';

const router = express.Router();

// Route to install settings plugin
router.post('/install', SettingsPluginController.installSettingsPlugin);

// Route to edit workspace settings
router.put('/edit', SettingsPluginController.editWorkspaceSettings);

export default router;
