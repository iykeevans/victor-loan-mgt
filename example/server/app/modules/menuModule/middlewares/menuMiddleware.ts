// modules/exampleModule/middlewares/exampleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const exampleMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log('Example middleware executed');
  next();
};

export default exampleMiddleware;
