
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Users, Target, DollarSign, Play, CheckCircle, AlertTriangle } from "lucide-react";

const performanceData = [
  { name: "Test A", ctr: 3.2, roas: 4.5, cpd: 12.50 },
  { name: "Test B", ctr: 2.8, roas: 3.8, cpd: 15.20 },
  { name: "Test C", ctr: 4.1, roas: 5.2, cpd: 9.80 },
  { name: "Test D", ctr: 3.7, roas: 4.1, cpd: 11.40 },
  { name: "Test E", ctr: 2.9, roas: 3.6, cpd: 16.10 },
];

const conversionData = [
  { time: "00:00", conversions: 45, engagement: 78 },
  { time: "04:00", conversions: 32, engagement: 65 },
  { time: "08:00", conversions: 67, engagement: 89 },
  { time: "12:00", conversions: 84, engagement: 92 },
  { time: "16:00", conversions: 71, engagement: 86 },
  { time: "20:00", conversions: 59, engagement: 81 },
];

export function Dashboard() {
  return (
    <div className="space-y-8 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Marketing Analytics
          </h1>
          <p className="text-muted-foreground mt-2">Monitor your A/B tests and campaign performance</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Create New Test
          </Button>
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Experiments</CardTitle>
              <Target className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">156</div>
            <div className="flex items-center text-sm text-green-400 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Tests</CardTitle>
              <Play className="h-5 w-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">24</div>
            <Progress value={75} className="mt-3 h-2 bg-muted" />
            <p className="text-xs text-muted-foreground mt-2">75% of capacity</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg ROAS</CardTitle>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">4.2x</div>
            <p className="text-sm text-yellow-400 mt-1">Excellent performance</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tests</CardTitle>
              <CheckCircle className="h-5 w-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">132</div>
            <p className="text-sm text-purple-400 mt-1">87% success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-blue-400" />
              A/B Test Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#f8fafc'
                  }} 
                />
                <Bar dataKey="ctr" fill="#3b82f6" name="CTR %" />
                <Bar dataKey="roas" fill="#10b981" name="ROAS" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-emerald-400" />
              Real-time Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#f8fafc'
                  }} 
                />
                <Area type="monotone" dataKey="conversions" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="engagement" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Experiments */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-400" />
              Active Experiments
            </span>
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                id: 1, 
                name: "Landing Page CTA Optimization", 
                status: "running", 
                progress: 65,
                metric: "CTR: 3.2% vs 2.8%",
                timeLeft: "5 days remaining" 
              },
              { 
                id: 2, 
                name: "Email Subject Line Test", 
                status: "running", 
                progress: 89,
                metric: "Open Rate: 24.5% vs 19.2%",
                timeLeft: "1 day remaining" 
              },
              { 
                id: 3, 
                name: "Product Page Layout", 
                status: "pending", 
                progress: 0,
                metric: "Awaiting traffic",
                timeLeft: "Starting tomorrow" 
              },
              { 
                id: 4, 
                name: "Ad Creative Variation", 
                status: "running", 
                progress: 42,
                metric: "ROAS: 4.1x vs 3.6x",
                timeLeft: "8 days remaining" 
              },
            ].map((experiment) => (
              <div key={experiment.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-foreground">{experiment.name}</h4>
                    <Badge
                      variant="outline"
                      className={
                        experiment.status === "running" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20" 
                          : experiment.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }
                    >
                      {experiment.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{experiment.metric}</span>
                    <span>•</span>
                    <span>{experiment.timeLeft}</span>
                  </div>
                  {experiment.status === "running" && (
                    <Progress value={experiment.progress} className="mt-3 h-2 bg-muted" />
                  )}
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-white/10">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
