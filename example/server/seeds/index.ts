import mongoose from 'mongoose';
import seedPlans from './seedPlan';
import seedUsers from './seedUser';
import seedRoles from "./seedRole"

const mongoURI = 'mongodb://localhost:27017/workspace_example'; // Replace with your MongoDB URI

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log('Connected to MongoDB...');

    // Seed plans and users
    await seedPlans();
    await seedUsers();
    await seedRoles()

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
