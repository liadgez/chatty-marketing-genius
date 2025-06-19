
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

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

export function ChartsArea() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="glass-effect border-white/10 bg-black/20">
        <CardHeader>
          <CardTitle className="text-white font-semibold">A/B Test Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
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
        <CardHeader>
          <CardTitle className="text-white font-semibold">Real-time Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
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
