// src/plugins/pluginSeed.ts
import Plugin from '../models/pluginModel';

async function seedPlugins() {
  const plugins = [
    {
      name: 'Analytics Plugin',
      description: 'Provides advanced analytics features for your workspace.',
      isPurchasable: true,
      price: 50,
    },
    {
      name: 'Custom Theme',
      description: 'A plugin to change the workspace theme.',
      isPurchasable: false,
      price: 0,
    },
  ];

  await Plugin.insertMany(plugins);
  console.log('Plugins seeded');
}

seedPlugins();
