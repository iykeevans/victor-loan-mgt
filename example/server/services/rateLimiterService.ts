import UserPlan from '../models/userPlan';
import UserApiUsage from '../models/apiUsageModel';


/*
Check the User's Plan: First, the function retrieves the user's subscription plan from the UserPlan model.
 This plan contains information like the rate limit and frequency (daily, weekly, monthly).
Check Usage History: Next, the function checks the UserApiUsage model for the user's API usage.
 This model keeps track of the number of API calls made by the user within the time period defined by their plan.
Reset or Update Usage: Based on the frequency (e.g., daily), 
the function checks if the current time exceeds the reset period (e.g., 24 hours).
 If it does, it resets the usage count. If not, it checks if the user has exceeded their 
 API usage limit.
Return Result: If the usage exceeds the limit, the function returns true, indicating that 
the rate limit has been exceeded. Otherwise, it returns false.*/

export const checkApiRateLimit = async (userId: string): Promise<boolean> => {
  try {
    // 1. Get the user's plan from the UserPlan model
    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan) {
      throw new Error('User plan not found');
    }

    // 2. Get the API usage data for the user from UserApiUsage model
    const userApiUsage = await UserApiUsage.findOne({ userId, frequency: userPlan.frequency });
    
    if (!userApiUsage) {
      // If no usage record exists, assume this is the first API call
      await UserApiUsage.create({
        userId,
        apiCalls: 1,
        lastReset: new Date(),
        frequency: userPlan.frequency,
      });
      return false; // No rate limit exceeded
    }

    // 3. Check if it's time to reset the usage based on the frequency (e.g., daily, weekly, etc.)
    const now = new Date();
    let resetDate: Date;

    switch (userPlan.frequency) {
      case 'daily':
        resetDate = new Date(userApiUsage.lastReset);
        resetDate.setDate(resetDate.getDate() + 1); // Reset every 24 hours
        break;
      case 'weekly':
        resetDate = new Date(userApiUsage.lastReset);
        resetDate.setDate(resetDate.getDate() + 7); // Reset every 7 days
        break;
      case 'monthly':
        resetDate = new Date(userApiUsage.lastReset);
        resetDate.setMonth(resetDate.getMonth() + 1); // Reset every month
        break;
      default:
        throw new Error('Invalid frequency');
    }

    // 4. If the rate limit is reached or the reset time has passed, update the usage or reset
    if (now >= resetDate) {
      // Reset the count
      userApiUsage.apiCalls = 1;
      userApiUsage.lastReset = now;
      await userApiUsage.save();
      return false; // No rate limit exceeded, usage is reset
    }

    // 5. Check if the user has exceeded the API rate limit
    if (userApiUsage.apiCalls >= userPlan.rateLimit) {
      return true; // Rate limit exceeded
    }

    // 6. If the limit is not exceeded, increment the API call count
    userApiUsage.apiCalls += 1;
    await userApiUsage.save();

    return false; // Rate limit not exceeded
  } catch (error) {
    console.error('Error checking API rate limit:', error);
    throw error;
  }
};




const MAX_LIMIT = {
  daily: 100, // Max API requests per day
  weekly: 500, // Max API requests per week
  monthly: 2000, // Max API requests per month
};

export const checkApiRateLimitByApKey = async (apikey: string, frequency: 'daily' | 'weekly' | 'monthly'): Promise<boolean> => {
  try {
    const currentDate = new Date();

    // Find or create the rate limit entry for the given apikey and frequency
    let rateLimit = await UserApiUsage.findOne({ apikey, frequency }).exec();

    if (!rateLimit) {
      // If no entry exists, create a new one with requestCount 0
      rateLimit = new UserApiUsage({
        apikey,
        frequency,
        requestCount: 0,
        lastChecked: currentDate,
      });
      await rateLimit.save();
    }

    // Check if the frequency period has passed and reset the counter if necessary
    const timeDifference = currentDate.getTime() - rateLimit.lastReset.getTime();
    const resetTimeMap = {
      daily: 24 * 60 * 60 * 1000, // 1 day
      weekly: 7 * 24 * 60 * 60 * 1000, // 1 week
      monthly: 30 * 24 * 60 * 60 * 1000, // 1 month
    };

    if (timeDifference > resetTimeMap[frequency]) {
      // Reset request count after the frequency period has passed
      rateLimit.apiCalls = 0;
      rateLimit.lastReset = currentDate;
    }

    // Check if the request count exceeds the limit
    if (rateLimit.apiCalls >= MAX_LIMIT[frequency]) {
      return false; // Rate limit exceeded
    }

    // Increment the request count
    rateLimit.apiCalls += 1;
    await rateLimit.save();

    return true; // Rate limit not exceeded
  } catch (error: any) {
    throw new Error(`Error checking rate limit: ${error.message}`);
  }
};
