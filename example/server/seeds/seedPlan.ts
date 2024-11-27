import mongoose from 'mongoose';
import Plan from '../models/planModel';  // Assuming you have Plan model as shown earlier

const seedPlans = async () => {
  try {
    const plans = [
      {
        name: 'Free Plan',
        description: 'Limited access to the API with low rate limits.',
        maxLimit: 100, // Max 100 API calls per day
        frequency: 'daily',
        cost: 0, // Free plan
        maxWorkspaces: 1,
        maxUsers:5
      },
      {
        name: 'Basic Plan',
        description: 'Basic plan with moderate rate limits.',
        maxLimit: 500, // Max 500 API calls per day
        frequency: 'daily',
        cost: 9.99, // Monthly cost
        maxWorkspaces: 1,
        maxUsers:500
      },
      {
        name: 'Pro Plan',
        description: 'Pro plan with high rate limits.',
        maxLimit: 1000, // Max 1000 API calls per day
        frequency: 'daily',
        cost: 29.99, // Monthly cost
        maxWorkspaces: 1,
        maxUsers:14999
      },
      {
        name: 'Enterprise Plan',
        description: 'High-volume plan for enterprises with unlimited API calls.',
        maxLimit: 10000, // Max 10,000 API calls per day
        frequency: 'daily',
        cost: 99.99, // Monthly cost
        maxWorkspaces: 1,
        maxUsers:599999
      },
      {
        name: 'Unlimited Enterprise Plan',
        description: 'High-volume plan for enterprises with unlimited API calls.',
        maxLimit: 10000, // Max 10,000 API calls per day
        frequency: 'daily',
        cost: 99.99, // Monthly cost
        maxWorkspaces: 1,
        maxUsers:999999999999
      }
    ];

    // Create and save all plans
    await Plan.insertMany(plans);
    console.log('Plans seeded successfully!');
  } catch (error) {
    console.error('Error seeding plans:', error);
  }
};

export default seedPlans;
