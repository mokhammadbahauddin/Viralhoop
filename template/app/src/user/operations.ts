import { User, TeamMember } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { GetTeamMembers, InviteTeamMember, UpdateUser, GetPaginatedUsers, UpdateIsUserAdminById } from 'wasp/server/operations';

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

// --- Admin Operations Restored ---

type GetPaginatedUsersInput = {
  skipPages: number;
  filter?: {
    emailContains?: string;
    isAdmin?: boolean;
    subscriptionStatusIn?: (string | null)[];
  };
};

type GetPaginatedUsersOutput = {
  users: User[];
  totalPages: number;
};

export const getPaginatedUsers: GetPaginatedUsers<
  GetPaginatedUsersInput,
  GetPaginatedUsersOutput
> = async (args, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }

  const PAGE_SIZE = 10;
  const skip = args.skipPages * PAGE_SIZE;
  const take = PAGE_SIZE;

  const allSubscriptionStatusOptions = args.filter?.subscriptionStatusIn;
  const hasSubscriptionStatusFilter =
    allSubscriptionStatusOptions && allSubscriptionStatusOptions.length > 0;

  const whereArgs = {
    AND: [
      {
        email: {
          contains: args.filter?.emailContains,
          mode: "insensitive", // Prisma case insensitive
        },
      },
      {
        isAdmin: args.filter?.isAdmin,
      },
      {
        subscriptionStatus: {
          in: hasSubscriptionStatusFilter
            ? allSubscriptionStatusOptions
            : undefined,
        },
      },
    ],
  } as any;

  const users = await context.entities.User.findMany({
    skip: skip,
    take: take,
    where: whereArgs,
    orderBy: {
      id: "desc",
    },
  });

  const totalUserCount = await context.entities.User.count({
    where: whereArgs,
  });
  const totalPages = Math.ceil(totalUserCount / take);

  return {
    users,
    totalPages,
  };
};

type UpdateIsUserAdminByIdInput = {
  id: string;
  isAdmin: boolean;
};

export const updateIsUserAdminById: UpdateIsUserAdminById<
  UpdateIsUserAdminByIdInput,
  User
> = async ({ id, isAdmin }, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }

  return context.entities.User.update({
    where: {
      id,
    },
    data: {
      isAdmin,
    },
  });
};
