
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Calendar,
  Filter,
  Download
} from "lucide-react";

const conversionData = [
  { name: "Mon", conversions: 45, revenue: 1250, cpa: 27.78 },
  { name: "Tue", conversions: 52, revenue: 1440, cpa: 25.00 },
  { name: "Wed", conversions: 38, revenue: 1050, cpa: 31.58 },
  { name: "Thu", conversions: 61, revenue: 1680, cpa: 23.93 },
  { name: "Fri", conversions: 74, revenue: 2040, cpa: 21.62 },
  { name: "Sat", conversions: 43, revenue: 1180, cpa: 29.07 },
  { name: "Sun", conversions: 39, revenue: 1070, cpa: 30.77 },
];

const channelData = [
  { name: "Google Ads", conversions: 156, value: 156, color: "#3b82f6" },
  { name: "Facebook", conversions: 89, value: 89, color: "#10b981" },
  { name: "Email", conversions: 67, value: 67, color: "#f59e0b" },
  { name: "Organic", conversions: 43, value: 43, color: "#8b5cf6" },
  { name: "Direct", conversions: 25, value: 25, color: "#ef4444" },
];

const funnelData = [
  { stage: "Visitors", count: 10000, rate: 100 },
  { stage: "Engaged", count: 3500, rate: 35 },
  { stage: "Leads", count: 850, rate: 8.5 },
  { stage: "Qualified", count: 340, rate: 3.4 },
  { stage: "Customers", count: 92, rate: 0.92 },
];

export function ConversionsTracking() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Conversions
          </h1>
          <p className="text-muted-foreground mt-2">Track performance across all channels and campaigns</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 Days
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
              <Target className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">352</div>
            <div className="flex items-center text-sm text-green-400 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +18.2% vs last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
              <Users className="h-5 w-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3.52%</div>
            <div className="flex items-center text-sm text-emerald-400 mt-1">
              +0.4% improvement
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$9,710</div>
            <div className="flex items-center text-sm text-yellow-400 mt-1">
              Average $27.59 per conversion
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cost per Acquisition</CardTitle>
              <Target className="h-5 w-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$26.74</div>
            <div className="flex items-center text-sm text-green-400 mt-1">
              -12.3% cost reduction
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
              Daily Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
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
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Target className="h-5 w-5 mr-2 text-emerald-400" />
              Conversions by Channel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#f8fafc'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-400" />
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{stage.count.toLocaleString()}</span>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      {stage.rate}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-6 relative overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(stage.rate * 10, 5)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                </div>
                {index < funnelData.length - 1 && (
                  <div className="text-center mt-2 text-xs text-muted-foreground">
                    ↓ {((funnelData[index + 1].count / stage.count) * 100).toFixed(1)}% conversion
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-yellow-400" />
              Channel Performance
            </span>
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
              View Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channelData.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: channel.color }}
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{channel.name}</h4>
                    <p className="text-sm text-muted-foreground">{channel.conversions} conversions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">${(channel.conversions * 27.59).toFixed(0)}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
