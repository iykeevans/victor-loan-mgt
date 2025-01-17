// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Assuming JWT authentication
import User from '../models/userModel'; // Assuming you have a User model
import Workspace from '../models/workSpaceModel';
import PluginManagerService, { checkPluginAccess} from '../services/pluginServce';


export interface IRequestUser{
  userID?: string;
  identifier?: string;
  workspace?:any;
  user?: any;
  roles: any;
  role?: string;
  userFunctions?: any;
  workSpaceId?: any;
}


// Middleware to ensure the user is authenticated
export const ensureAuthenticated = async (req: Request & IRequestUser, res: any, next: any) => {
  const token : any= req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const  userID = decoded.userID;
     // Extract workspaceId from the request (URL, body, or query)
     const workspaceIdFromRequest = decoded.workspaceId ||   req.body.workspaceId || req.query.workspaceId || req.params.workspaceId;

     if (!workspaceIdFromRequest) {
       return res.status(400).json({ message: 'Workspace ID is required' });
     }
    // Check if the user exists in the workspace
    const workspace = await Workspace.findById(workspaceIdFromRequest).populate('members');
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    const userInWorkspace = workspace.members.some( (user: any) => user._id.toString() === userID.toString());
    if (!userInWorkspace) {
      return res.status(403).json({ message: 'User does not belong to this workspace' });
    }
     // Attach the decoded user and workspace information to the request object
     req.user = decoded;
     req.workspace = workspace;
     req.userID = decoded.userId;  // Attach userId to the request object
     req.role = decoded.role
     req.userFunctions = decoded.userFunctions
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


export const verifyToken = (req:  Request & IRequestUser, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, 'your_jwt_secret', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
};



// Middleware to check if the user has the required permission
export const hasPermission = (permission: string) => {
  return async (req:  Request & IRequestUser, res: Response, next: NextFunction) :Promise<any> => {
    try {
      const user = await User.findById(req.userID);  // Assuming userId is added to req by auth middleware
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Check if the user has the permission
      if (user.permissions.includes(permission)) {
        return next();  // Proceed to the next middleware/route handler
      }

      return res.status(403).json({ message: 'Permission denied' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};



const pluginManagerMiddleware = async (req: Request, res: Response, next: any) => {
  const { workspaceId, pluginName } = req.params;  // Assume pluginName and workspaceId are passed in the request
  await checkPluginAccess(workspaceId, pluginName, res, next);
};

export default pluginManagerMiddleware;