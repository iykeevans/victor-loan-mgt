import express from 'express';
import { checkRateLimit } from '../utils/rateLimiter';
import { Request, Response } from 'express';

const router = express.Router();

// API endpoint to check rate limit before accessing the API
router.get('/api', async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  
  try {
    await checkRateLimit(userId);
    res.status(200).json({ message: 'API call allowed' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


// router.get('/protected-api', async (req: Request, res: Response):Promise<any>  => {
//     try {
//       const userId = req.user.userId; // Get the userId from the authenticated user
      
//       // Check if the user has exceeded their API rate limit
//       const isRateLimited = await checkRateLimit(userId);
  
//       if (isRateLimited) {
//         return res.status(429).json({ message: 'API rate limit exceeded. Try again later.' });
//       }
  
//       // If rate limit is not exceeded, proceed with the API request
//       res.status(200).json({ message: 'You have access to this API endpoint' });
  
//     } catch (error) {
//       res.status(500).json({ message: 'Error checking rate limit', error });
//     }
//   });

export default router;
