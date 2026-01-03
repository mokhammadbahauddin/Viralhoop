import { User, TeamMember } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { GetTeamMembers, InviteTeamMember, UpdateUser } from 'wasp/server/operations';

export const getTeamMembers: GetTeamMembers<void, TeamMember[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.TeamMember.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' },
  });
};

type InviteTeamMemberInput = {
  email: string;
  role: string;
};

export const inviteTeamMember: InviteTeamMember<InviteTeamMemberInput, TeamMember> = async ({ email, role }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // In a real app, we would send an email here.
  // For now, just create the record.

  return context.entities.TeamMember.create({
    data: {
      email,
      role,
      status: 'Pending',
      userId: context.user.id,
    },
  });
};

type UpdateUserInput = {
  username?: string;
};

export const updateUser: UpdateUser<UpdateUserInput, User> = async ({ username }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.User.update({
    where: { id: context.user.id },
    data: {
      username,
    },
  });
};
