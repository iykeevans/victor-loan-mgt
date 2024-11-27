// src/seeds/rolesSeeder.ts
import Role from '../models/roleModel';
import Permission from '../models/permissionModel';

const seedRoles = async () => {
  // Create default permissions
  const permissions = await Permission.create([
    { name: 'create', description: 'Can create new workspaces' },
    { name: 'edit', description: 'Can edit workspaces' },
    { name: 'delete', description: 'Can delete workspaces' },
    { name: 'invite', description: 'Can invite members' },
    { name: 'assignRole', description: 'Can assign roles to members' },
    { name: 'removeMember', description: 'Can remove members from workspace' },
  ]);

  // Create roles
  await Role.create([
    {
      name: 'Super Admin',
      permissions: permissions.map((p) => p._id), // Super Admin has all permissions
    },
    {
      name: 'Admin',
      permissions: [permissions[0]._id, permissions[1]._id, permissions[3]._id, permissions[4]._id], // Admin can create, edit, invite, assign roles
    },
    {
      name: 'User',
      permissions: [permissions[0]._id, permissions[1]._id], // User can create and edit workspaces
    },
  ]);
};

export default seedRoles;
