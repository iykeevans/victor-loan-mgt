// src/plugins/settingsPlugin/settingsPluginSeed.ts
import SettingsPlugin from './model/settingsModel';

async function seedSettingsPlugin() {
  const plugin = {
    name: 'Settings Plugin',
    description: 'Plugin to manage workspace settings like name and description.',
    isPurchasable: false, // Free plugin
    price: 0,
  };

  await SettingsPlugin.create(plugin);
  console.log('Settings Plugin seeded');
}

seedSettingsPlugin();
