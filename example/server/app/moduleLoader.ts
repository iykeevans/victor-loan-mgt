// src/moduleLoader.ts
import path from 'path';
import fs from 'fs';
import { Application } from 'express';

export const loadModules = (app: Application): void => {
  const modulesDir = path.join(__dirname, 'modules');
  const modules = fs.readdirSync(modulesDir).filter((file) => {
    return fs.lstatSync(path.join(modulesDir, file)).isDirectory();
  });

  modules.forEach((moduleName) => {
    const moduleDir = path.join(modulesDir, moduleName);
    // Check if the module has a setup file
    const setupFile = path.join(moduleDir, 'setup.ts');
    if (fs.existsSync(setupFile)) {
      const setupModule = require(setupFile).default;
      console.log(`Installing module: ${moduleName}`);
      setupModule(app);  // Run the setup function to install the module
    }
  });
};
