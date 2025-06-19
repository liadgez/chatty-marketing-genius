
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
    <Card className="glass-effect border-white/10 bg-white/10 rounded-xl">
      <CardHeader className="p-4 sm:p-6 md:p-6 lg:p-8">
        <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 bg-white/20 rounded" />
      </CardHeader>
      <CardContent className="p-4 sm:p-6 md:p-6 lg:p-8 pt-0">
        <div className="space-y-3 sm:space-y-4">
          <Skeleton className="h-48 sm:h-64 md:h-64 lg:h-80 w-full bg-white/20 rounded" />
          <div className="flex justify-between">
            <Skeleton className="h-3 sm:h-4 w-8 sm:w-12 bg-white/20 rounded" />
            <Skeleton className="h-3 sm:h-4 w-8 sm:w-12 bg-white/20 rounded" />
            <Skeleton className="h-3 sm:h-4 w-8 sm:w-12 bg-white/20 rounded" />
            <Skeleton className="h-3 sm:h-4 w-8 sm:w-12 bg-white/20 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartsArea() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateTest = () => {
    console.log("Creating new test from charts area...");
  };

  const handleViewGuide = () => {
    console.log("Opening test setup guide...");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
        <EmptyState type="tests" onAction={handleCreateTest} />
        <EmptyState type="analytics" onAction={handleViewGuide} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
      {/* Bar Chart */}
      <Card className="glass-effect border-white/10 bg-white/10 rounded-xl shadow-lg backdrop-blur-md hover:border-white/20 transition-all duration-300">
        <CardHeader className="p-4 sm:p-6 md:p-6 lg:p-8 pb-2 sm:pb-4">
          <CardTitle className="text-white font-semibold text-base sm:text-lg md:text-lg lg:text-xl">A/B Test Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-6 lg:p-8 pt-0">
          <div className="h-48 sm:h-64 md:h-64 lg:h-80 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={testPerformanceData} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#ffffff99', fontSize: 10 }}
                    axisLine={{ stroke: '#ffffff20' }}
                    tickLine={{ stroke: '#ffffff20' }}
                  />
                  <YAxis 
                    tick={{ fill: '#ffffff99', fontSize: 10 }}
                    axisLine={{ stroke: '#ffffff20' }}
                    tickLine={{ stroke: '#ffffff20' }}
                    width={30}
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
          </div>
        </CardContent>
      </Card>

      {/* Area Chart */}
      <Card className="glass-effect border-white/10 bg-white/10 rounded-xl shadow-lg backdrop-blur-md hover:border-white/20 transition-all duration-300">
        <CardHeader className="p-4 sm:p-6 md:p-6 lg:p-8 pb-2 sm:pb-4">
          <CardTitle className="text-white font-semibold text-base sm:text-lg md:text-lg lg:text-xl">Real-time Conversions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-6 lg:p-8 pt-0">
          <div className="h-48 sm:h-64 md:h-64 lg:h-80 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={conversionsData} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="time" 
                    tick={{ fill: '#ffffff99', fontSize: 10 }}
                    axisLine={{ stroke: '#ffffff20' }}
                    tickLine={{ stroke: '#ffffff20' }}
                  />
                  <YAxis 
                    tick={{ fill: '#ffffff99', fontSize: 10 }}
                    axisLine={{ stroke: '#ffffff20' }}
                    tickLine={{ stroke: '#ffffff20' }}
                    width={30}
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
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
