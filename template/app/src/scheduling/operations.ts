import { ScheduledPost, User } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { SchedulePost, GetScheduledPosts } from 'wasp/server/operations';

export const getScheduledPosts: GetScheduledPosts<void, ScheduledPost[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.ScheduledPost.findMany({
    where: { userId: context.user.id },
    orderBy: { scheduledFor: 'asc' },
  });
};

type SchedulePostInput = {
  content: string;
  platform: string;
  scheduledFor: Date;
};

export const schedulePost: SchedulePost<SchedulePostInput, ScheduledPost> = async ({ content, platform, scheduledFor }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.ScheduledPost.create({
    data: {
      content,
      platform,
      scheduledFor,
      status: 'Pending',
      userId: context.user.id,
    },
  });
};
