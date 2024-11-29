
import { IUser } from '../../../../models/userModel';
import { IRole } from '../../../../models/roleModel';
import User  from '../../../../models/userModel';
import Role  from '../../../../models/roleModel';
import UserFunction from '../../userFunctionModule/repository/userFunctionRepository';

import { IApprover } from '../repository/approvalConfigRepository';
import ApprovalConfiguration from '../repository/approvalConfigRepository';

export const seedRolesAndUsers = async () => {
  try {
    // Seed roles
    const adminRole = await Role.create({ name: 'admin' });
    const managerRole = await Role.create({ name: 'manager' });
    const userRole = await Role.create({ name: 'user' });

    // Seed users
    const adminUser: IUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      roles: [adminRole._id], // Associate the 'admin' role
    });

    const managerUser: IUser = await User.create({
      name: 'Manager User',
      email: 'manager@example.com',
      password: 'password123',
      roles: [managerRole._id], // Associate the 'manager' role
    });

    const regularUser: IUser = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123',
      roles: [userRole._id], // Associate the 'user' role
    });

    console.log('Roles and Users seeded successfully!');
    return { adminUser, managerUser, regularUser };
  } catch (error) {
    console.error('Error seeding roles and users:', error);
  }
};


// seeds/userFunctionSeed.ts



export const seedUserFunctions = async () => {
  try {
    // Seed UserFunctions
    const userFunction1 = await UserFunction.create({
      name: 'Create Workspace',
      description: 'Function to create a new workspace.',
    });

    const userFunction2 = await UserFunction.create({
      name: 'Delete Workspace',
      description: 'Function to delete a workspace.',
    });

    console.log('User functions seeded successfully!');
    return { userFunction1, userFunction2 };
  } catch (error) {
    console.error('Error seeding user functions:', error);
  }
};



// seeds/approvalConfigSeed.ts


export const seedApprovalConfigurations = async () => {
  try {
    // Fetch user functions and users
    const userFunction1: any = await UserFunction.findOne({ name: 'Create Workspace' });
    const userFunction2 : any= await UserFunction.findOne({ name: 'Delete Workspace' });

    const adminUser : any= await User.findOne({ email: 'admin@example.com' });
    const managerUser : any= await User.findOne({ email: 'manager@example.com' });
    const regularUser : any= await User.findOne({ email: 'user@example.com' });

    // Create approvers array
    const approvers:  IApprover[] = [
      { user: adminUser._id, level: 1 },
      { user: managerUser._id, level: 2 },
      { user: regularUser._id, level: 3 },
    ];

    // Seed Approval Configurations
    const approvalConfig1 = await ApprovalConfiguration.create({
      userFunction: userFunction1._id,
      approvers: approvers,
    });

    const approvalConfig2 = await ApprovalConfiguration.create({
      userFunction: userFunction2._id,
      approvers: approvers,
    });

    console.log('Approval configurations seeded successfully!');
    return { approvalConfig1, approvalConfig2 };
  } catch (error) {
    console.error('Error seeding approval configurations:', error);
  }
};
