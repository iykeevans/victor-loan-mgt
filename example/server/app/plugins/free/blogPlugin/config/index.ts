// index.ts
import express from 'express';
import blogRoutes from '../routes/blogRoutes';
import  pluginManager  from '../../../PluginManager';  // Assuming pluginManager handles registering routes dynamically

const app = express();
app.use(express.json());
// Register the blog plugin routes
pluginManager.registerPluginRoutes('blogPlugin', blogRoutes);
// Use the blog plugin routes under `/api/plugins/use`
app.use('/api/plugins/use/blogPlugin', blogRoutes);
 
export default app;
