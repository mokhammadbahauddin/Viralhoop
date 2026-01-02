import { GetHistory } from 'wasp/server/operations';
import { ContentHistory } from 'wasp/entities';
import { HttpError } from 'wasp/server';

export const getHistory: GetHistory<void, ContentHistory[]> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.ContentHistory.findMany({
    where: {
      userId: context.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
