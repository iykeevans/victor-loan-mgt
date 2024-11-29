// src/services/workspaceService.ts

import Workspace, { UserRole } from '../models/workSpaceModel';
import User from '../models/userModel';
import Role from "../models/roleModel"
import Plan from '../models/planModel';
import { sendInviteEmail } from './emailService'; // Utility for sending emails
import { checkPermission, assignRoleToUser, createRole } from './roleBaseAccessService'; // Import RBAC service


// Create a new workspace
export const createWorkspace = async (userId: string, planId: string, workspaceName: string) => {
  const workspace = new Workspace({
    name: workspaceName,
    ownerId: userId,
    plan: planId,
    members: [{ userId, role: UserRole.OWNER }],
  });

  await workspace.save();

  // Add the workspace to the user's workspaces array
  await User.findByIdAndUpdate(userId, {
    $push: { workspaces: workspace._id },
  });

  return workspace;
};

// Invite a user to the workspace
export const inviteToWorkspace = async (
  inviterId: string,
  inviteeEmail: string,
  workspaceId: string
) => {

  // Check if inviter has invite permission
  await checkPermission(inviterId, workspaceId, 'invite');


  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) throw new Error('Workspace not found');

  // Check if the inviter is an admin or owner
  const inviter = workspace.members.find(
    (member: any) => member.userId.toString() === inviterId &&
      [UserRole.ADMIN, UserRole.OWNER].includes(member.role)
  );
  if (!inviter) throw new Error('Permission denied');

  // Find the invitee by email
  const invitee = await User.findOne({ email: inviteeEmail }).exec();
  if (!invitee) throw new Error('Invitee not found');



  // Find the user and the workspace

  const planId = workspace.plan;  // Plan associated with the workspace
  const plan = await Plan.findById(planId)
  if (!plan) throw new Error('Pln not found');


  // Check if the number of users exceeds the plan's maxUsers
  if (workspace.members.length >= plan.maxUsers) {
    throw new Error(`Cannot add more users. The limit of ${plan.maxUsers} has been reached.`);
  }

  // Send an invite email to the invitee
  const invitationLink = `http://localhost:3001/workspace/${workspaceId}/accept-invite`;

  sendInviteEmail(invitee.email, invitationLink, workspace.name);

  // Optional: Record the invite in the database or handle it as a separate process
  return { success: true, message: 'Invite sent' };
};

// Accept an invite and add the user to the workspace
export const acceptInvite = async (userId: any, workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) throw new Error('Workspace not found');

  // Check if user is already a member
  if (workspace.members.some((member: any) => member.userId.toString() === userId)) {
    throw new Error('User is already a member');
  }

  // Add the user as a member with the default 'member' role
  workspace.members.push({ userId, role: UserRole.MEMBER });
  await workspace.save();

  // Add the workspace to the user's workspaces array
  await User.findByIdAndUpdate(userId, {
    $push: { workspaces: workspace._id },
  });

  return { success: true, message: 'Invitation accepted' };
};


export const assignRole = async (
  adminId: string,
  userId: string,
  workspaceId: string,
  newRole: any //UserRole
) => {




  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) throw new Error('Workspace not found');

  // Check if the adminId has permission to assign roles
  //     // Check if the admin has permission to assign roles
  await checkPermission(adminId, workspaceId, 'assignRole');
  const admin = workspace.members.find(
    (member: any) => member.userId.toString() === adminId && member.role === UserRole.OWNER
  );
  if (!admin) throw new Error('Permission denied');




  const role = await Role.findOne({ name: newRole }).exec();
  if (!role) throw new Error('Role not found');

  // Assign the role to the user
  await assignRoleToUser(userId, workspaceId, role._id);

  return { success: true, message: 'Role updated successfully' };
};

// Remove a member from the workspace
export const removeMember = async (adminId: string, userId: string, workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) throw new Error('Workspace not found');

  // Check if the adminId has permission to remove members
  const admin = workspace.members.find(
    (member: any) => member.userId.toString() === adminId && member.role === UserRole.OWNER
  );
  if (!admin) throw new Error('Permission denied');

  // Remove the user from the workspace
  workspace.members = workspace.members.filter(
    (member: any) => member.userId.toString() !== userId
  );
  await workspace.save();

  // Remove the workspace from the user's list of workspaces
  await User.findByIdAndUpdate(userId, {
    $pull: { workspaces: workspace._id },
  });

  return { success: true, message: 'User removed from workspace' };
};



// Create a custom role
export const createCustomRole = async (adminId: string, workspaceId: string, roleName: string, permissions: string[]) => {
  // Check if the admin has permission to create roles
  await checkPermission(adminId, workspaceId, 'assignRole');

  // Create the custom role
  const newRole = await createRole(workspaceId, roleName, permissions);

  return { success: true, message: `Role ${roleName} created successfully`, role: newRole };
};



// src/services/workspaceSettingsService.ts

export const getWorkspaceDetails = async (workspaceId: string) => {
  // Fetch the workspace details from the database
  const workspace = await Workspace.findById(workspaceId).exec();
  if (!workspace) {
    throw new Error('Workspace not found');
  }
  return workspace;
};

export const updateWorkspaceDetails = async (workspaceId: string, updateData: any) => {
  // Update the workspace details in the database
  const updatedWorkspace = await Workspace.findByIdAndUpdate(workspaceId, updateData, { new: true }).exec();
  if (!updatedWorkspace) {
    throw new Error('Failed to update workspace');
  }
  return updatedWorkspace;
};
