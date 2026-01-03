import { User, ContentHistory } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { GetAdminStats } from 'wasp/server/operations';

type AdminStats = {
  totalUsers: number;
  totalContentGenerated: number;
  avgViralScore: number;
  totalCreditsUsed: number;
};

export const getAdminStats: GetAdminStats<void, AdminStats> = async (args, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }

  const totalUsers = await context.entities.User.count();
  const totalContentGenerated = await context.entities.ContentHistory.count();

  const aggregation = await context.entities.ContentHistory.aggregate({
    _avg: {
      viralScore: true,
    },
  });

  // Calculate credits used? We don't track "credits used" explicitly in a ledger, just remaining credits.
  // But we can approximate activity.
  // Or assuming Pro users use unlimited.
  // Let's just return 0 for now or calculate sum of decrements if we had a ledger.
  // We can count non-pro users with < 3 credits? No.

  return {
    totalUsers,
    totalContentGenerated,
    avgViralScore: Math.round(aggregation._avg.viralScore || 0),
    totalCreditsUsed: totalContentGenerated, // Approximation: 1 content = 1 credit equivalent
  };
};
