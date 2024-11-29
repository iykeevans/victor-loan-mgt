// modules/exampleModule/controllers/exampleController.ts
import { Request, Response } from 'express';

const exampleController = {
  getExample: (req: Request, res: Response): void => {
    res.json({ message: 'Example route accessed!' });
  }
};

export default exampleController;
