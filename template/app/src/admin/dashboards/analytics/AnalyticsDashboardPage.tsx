import { type AuthUser } from "wasp/auth";
import { getAdminStats, useQuery } from "wasp/client/operations";
import { cn } from "../../../client/utils";
import DefaultLayout from "../../layout/DefaultLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../../client/components/ui/card";
import { Users, BarChart2, Zap, CreditCard } from "lucide-react";

const Dashboard = ({ user }: { user: AuthUser }) => {
  const { data: stats, isLoading, error } = useQuery(getAdminStats);

  if (error) {
    return (
      <DefaultLayout user={user}>
        <div className="flex h-full items-center justify-center">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <p className="text-2xl font-bold text-red-500">Error</p>
            <p className="text-muted-foreground mt-2 text-sm">
              {error.message || "Something went wrong while fetching stats."}
            </p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout user={user}>
      <div className="relative p-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-6">ViralLoop Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? "..." : stats?.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? "..." : stats?.totalContentGenerated}</div>
                    <p className="text-xs text-muted-foreground">High engagement</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Viral Score</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? "..." : stats?.avgViralScore}</div>
                    <p className="text-xs text-muted-foreground">Target: &gt; 80</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Credits Consumed</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? "..." : stats?.totalCreditsUsed}</div>
                    <p className="text-xs text-muted-foreground">Est. Value: ${(stats?.totalCreditsUsed || 0) * 0.1}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
