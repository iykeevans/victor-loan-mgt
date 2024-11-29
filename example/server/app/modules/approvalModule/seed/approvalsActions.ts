// seedData.ts

import User  from '../../../../models/userModel';
import Role  from '../../../../models/roleModel';
import UserFunction from '../../userFunctionModule/repository/userFunctionRepository';
import ApprovalRequest from '../repository/approvalRepository';
// seeds/permissionsSeed.ts
import Permission from '../../../../models/permissionModel';

export const seedPermissionsAndRoles = async () => {
  // Create Permissions
  const createPermission = await Permission.create({ name: 'create' });
  const approvePermission = await Permission.create({ name: 'approve' });
  const viewPermission = await Permission.create({ name: 'view' });

  // Create Role with Permissions
  const adminRole = await Role.create({
    name: 'admin',
    permissions: [createPermission._id, approvePermission._id, viewPermission._id],
  });

  const userRole = await Role.create({
    name: 'user',
    permissions: [viewPermission._id],
  });

  console.log('Roles and Permissions seeded successfully');
};


// Seed Roles
async function seedRoles() {
  const adminRole = new Role({
    name: 'admin',
    permissions: ['can_request_approval', 'can_approve_requests'],
  });

  const managerRole = new Role({
    name: 'manager',
    permissions: ['can_approve_requests'],
  });

  const userRole = new Role({
    name: 'user',
    permissions: ['can_request_approval'],
  });

  await adminRole.save();
  await managerRole.save();
  await userRole.save();
}

// Seed Users
async function seedUsers() {
  const admin = new User({ username: 'adminUser', role: 'admin' });
  const manager = new User({ username: 'managerUser', role: 'manager' });
  const user = new User({ username: 'user1', role: 'user' });

  await admin.save();
  await manager.save();
  await user.save();
}

// Seed User Functions
async function seedUserFunctions() {
  const approvalUserFunction = new UserFunction({
    name: 'Create and Approve Records',
    description: 'User function that requires approval before action.',
    permissions: ['can_request_approval', 'can_approve_requests'],
  });

  await approvalUserFunction.save();
}

// Seed Approval Requests (Initial Data)
async function seedApprovalRequests() {
  const approvalRequest = new ApprovalRequest({
    requestUrl: 'https://example.com/api/endpoint',
    payload: { data: 'Test Data' },
    initiatorId: 'user1',
    userFunctionId: 'Create and Approve Records',
    approvers: [
      { approverId: 'managerUser', status: 'pending' },
      { approverId: 'adminUser', status: 'pending' },
    ],
    totalLevels: 2,
  });

  await approvalRequest.save();
}

// Call all seed functions
async function seedAllData() {
    await seedPermissionsAndRoles( )
  await seedRoles();
  await seedUsers();
  await seedUserFunctions();
  await seedApprovalRequests();
}

seedAllData()
  .then(() => console.log('Database seeded successfully'))
  .catch((err) => console.error('Error seeding database:', err));
