// import RequestHandler at the top
import express, { RequestHandler} from 'express';
import mongoose from 'mongoose';
import authRoutes from '../routes/authRoutes';
import planRoutes from '../routes/planRoutes';
import subscriptionRoutes from '../routes/subscription';
import workSpaceRoutes from "../routes/workSpaceRoutes"
import pluginRoutes from "../routes/pluginRoutes"
import { loadModules } from './moduleLoader';
import PluginManager from './plugins/PluginManager';
import { Express /*, Request, Response*/} from 'express';

import auditLogMiddleware from './modules/auditLogModule/middlewares/auditLogger';
// Initialize Express app
const app : Express = express();

// Middleware that transforms the raw string of req.body into json
app.use(express.urlencoded({extended: true}) as RequestHandler); 
app.use(express.json() as RequestHandler); 

//use custom lrge sets of middlewres audit log middleware
app.use(auditLogMiddleware)

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/oauth-example'; // Use env variable
mongoose.connect(mongoURI, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/);

// Load all modules dynamically
loadModules(app);

// Initialize the PluginManager to register routes
//const pluginManager = new PluginManager(app);
PluginManager.setApp(app)
PluginManager.registerPluginRoutesManually( ) 

// Setup routes core for plugin usge
app.use('/api/plugins', pluginRoutes);
 
// Register Core Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/plan', planRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/workspace', workSpaceRoutes);

// Error Handling Middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

export default app;
