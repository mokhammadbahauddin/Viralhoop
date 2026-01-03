import React from 'react';
import Chart from 'react-apexcharts';
import { useQuery } from 'wasp/client/operations';
import { getAnalytics } from 'wasp/client/operations';
import { Loader2, TrendingUp, BarChart, PieChart } from 'lucide-react';
import { Card } from '../../components/vertex/Card';

export const AnalyticsView = () => {
  const { data: analytics, isLoading } = useQuery(getAnalytics);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
        </div>
    );
  }

  const pieOptions = {
    labels: ['Summary', 'LinkedIn', 'Twitter', 'Blog'],
    colors: ['#18181b', '#3b82f6', '#000000', '#10b981'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '65%' } } }
  };

  const barOptions = {
    chart: { toolbar: { show: false } },
    colors: ['#18181b'],
    xaxis: { categories: analytics?.labels || [] },
    grid: { borderColor: '#f4f4f5' },
    dataLabels: { enabled: false }
  };

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto animate-enter">
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Performance Analytics</h2>
                    <p className="text-sm text-zinc-500 mt-1">Track the engagement of your repurposed content.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Generated</p>
                        <h3 className="text-2xl font-bold text-zinc-900 mt-1">{analytics?.totalContent}</h3>
                    </div>
                    <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><BarChart className="w-5 h-5" /></div>
                </Card>
                <Card className="p-5 flex items-center justify-between">
                    <div>
                         <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Growth</p>
                         <div className="flex items-center gap-1 mt-1">
                            <h3 className="text-2xl font-bold text-zinc-900">+12%</h3>
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> this week</span>
                         </div>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="font-semibold text-zinc-900 mb-6">Content Distribution</h3>
                    <div className="h-64">
                         {/* @ts-ignore */}
                         <Chart options={pieOptions} series={analytics?.breakdown || []} type="donut" height="100%" />
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="font-semibold text-zinc-900 mb-6">Generation Activity (Last 7 Days)</h3>
                    <div className="h-64">
                        {/* @ts-ignore */}
                        <Chart options={barOptions} series={[{ name: 'Posts', data: analytics?.activity || [] }]} type="bar" height="100%" />
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};
