import { GetHistory, GetAnalytics } from 'wasp/server/operations';
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

export const getAnalytics: GetAnalytics<void, any> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const userId = context.user.id;

  const totalContent = await context.entities.ContentHistory.count({
    where: { userId },
  });

  const summaryCount = await context.entities.ContentHistory.count({
    where: { userId, summary: { not: null } },
  });
  const linkedinCount = await context.entities.ContentHistory.count({
    where: { userId, linkedin: { not: null } },
  });
  const twitterCount = await context.entities.ContentHistory.count({
    where: { userId, twitter: { not: null } },
  });
  const blogCount = await context.entities.ContentHistory.count({
    where: { userId, blog: { not: null } },
  });

  // Get activity for the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentActivity = await context.entities.ContentHistory.findMany({
    where: {
        userId,
        createdAt: {
            gte: sevenDaysAgo
        }
    },
    select: {
        createdAt: true
    }
  });

  // Group by day for the chart
  const activityByDay: Record<string, number> = {};
  for(let i=0; i<7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      activityByDay[dateStr] = 0;
  }

  recentActivity.forEach(item => {
      const dateStr = item.createdAt.toISOString().split('T')[0];
      if (activityByDay[dateStr] !== undefined) {
          activityByDay[dateStr]++;
      }
  });

  return {
    totalContent,
    breakdown: [summaryCount, linkedinCount, twitterCount, blogCount],
    activity: Object.values(activityByDay).reverse(), // Last 7 days ordered
    labels: Object.keys(activityByDay).reverse().map(d => new Date(d).toLocaleDateString(undefined, { weekday: 'short' })),
  };
};
