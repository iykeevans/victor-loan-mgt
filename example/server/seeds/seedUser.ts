import mongoose from 'mongoose';
import User from '../models/userModel';  // Assuming you have User model as shown earlier
import { generateApiKey } from '../utils';  // Assuming you have a utility for API key generation
import Plan from '../models/planModel';  // Import Plan model to fetch the plans

const seedUsers = async () => {
  try {
    // Fetch available plans to assign to users
    const freePlan: any = await Plan.findOne({ name: 'Free Plan' }).exec();
    const basicPlan : any= await Plan.findOne({ name: 'Basic Plan' }).exec();
    const proPlan : any= await Plan.findOne({ name: 'Pro Plan' }).exec();

    const users = [
      {
        email: 'user1@example.com',
        password: 'password123',  // Use proper hashing in real-world scenarios
        apiKey: generateApiKey(),
        subscriptions: [freePlan._id], // Subscribed to Free Plan
      },
      {
        email: 'user2@example.com',
        password: 'password123',
        apiKey: generateApiKey(),
        subscriptions: [basicPlan._id], // Subscribed to Basic Plan
      },
      {
        email: 'user3@example.com',
        password: 'password123',
        apiKey: generateApiKey(),
        subscriptions: [proPlan._id], // Subscribed to Pro Plan
      },
      {
        email: 'user4@example.com',
        password: 'password123',
        apiKey: generateApiKey(),
        subscriptions: [freePlan._id, basicPlan._id], // Subscribed to both Free and Basic Plan
      },
    ];

    // Create and save all users
    await User.insertMany(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export default seedUsers;
