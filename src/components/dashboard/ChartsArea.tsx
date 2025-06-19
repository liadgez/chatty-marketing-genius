
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { useState, useEffect } from "react";

const testPerformanceData = [
  { name: "Test A", value: 4.2 },
  { name: "Test B", value: 3.8 },
  { name: "Test C", value: 5.1 },
  { name: "Test D", value: 2.9 },
  { name: "Test E", value: 4.7 },
];

const conversionsData = [
  { time: "00:00", value: 45 },
  { time: "04:00", value: 67 },
  { time: "08:00", value: 89 },
  { time: "12:00", value: 124 },
  { time: "16:00", value: 156 },
  { time: "20:00", value: 134 },
];

const chartConfig = {
  value: {
    label: "Performance",
    color: "hsl(200, 98%, 60%)",
  },
};

function ChartSkeleton() {
  return (
    <Card className="glass-effect border-white/10 bg-black/20">
      <CardHeader>
        <Skeleton className="h-6 w-40 bg-white/20" />
      </CardHeader>
      <CardContent>
        <div className="h-80 space-y-4">
          <Skeleton className="h-64 w-full bg-white/20" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-12 bg-white/20" />
            <Skeleton className="h-4 w-12 bg-white/20" />
            <Skeleton className="h-4 w-12 bg-white/20" />
            <Skeleton className="h-4 w-12 bg-white/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartsArea() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(true); // Toggle this to test empty state

  useEffect(() => {
    // Simulate chart data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate empty state - set to false to test empty state
      setHasData(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateTest = () => {
    console.log("Creating new test from charts area...");
    // Future: Add actual test creation logic
  };

  const handleViewGuide = () => {
    console.log("Opening test setup guide...");
    // Future: Add guide navigation logic
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <EmptyState type="tests" onAction={handleCreateTest} />
        <EmptyState type="analytics" onAction={handleViewGuide} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      {/* Bar Chart */}
      <Card className="glass-effect border-white/10 bg-black/20">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-white font-semibold text-lg">A/B Test Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <ChartContainer config={chartConfig} className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={testPerformanceData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#ffffff99', fontSize: 12 }}
                  axisLine={{ stroke: '#ffffff20' }}
                />
                <YAxis 
                  tick={{ fill: '#ffffff99', fontSize: 12 }}
                  axisLine={{ stroke: '#ffffff20' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="value" 
                  fill="url(#gradient1)"
                  radius={[4, 4, 0, 0]}
                  className="hover:brightness-110 transition-all duration-200"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Area Chart */}
      <Card className="glass-effect border-white/10 bg-black/20">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-white font-semibold text-lg">Real-time Conversions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <ChartContainer config={chartConfig} className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversionsData}>
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#ffffff99', fontSize: 12 }}
                  axisLine={{ stroke: '#ffffff20' }}
                />
                <YAxis 
                  tick={{ fill: '#ffffff99', fontSize: 12 }}
                  axisLine={{ stroke: '#ffffff20' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  fill="url(#gradient2)"
                  className="hover:brightness-110 transition-all duration-200"
                />
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
