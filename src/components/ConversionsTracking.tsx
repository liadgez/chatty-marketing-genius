
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, DollarSign, Users, Calendar, Filter, Download, Eye } from "lucide-react";

export function ConversionsTracking() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("conversions");

  // Mock data for conversions
  const conversionData = [
    { date: "Mon", conversions: 145, revenue: 12500, visitors: 3200 },
    { date: "Tue", conversions: 167, revenue: 14200, visitors: 3450 },
    { date: "Wed", conversions: 134, revenue: 11800, visitors: 2980 },
    { date: "Thu", conversions: 189, revenue: 16700, visitors: 3890 },
    { date: "Fri", conversions: 178, revenue: 15900, visitors: 3650 },
    { date: "Sat", conversions: 156, revenue: 13400, visitors: 3100 },
    { date: "Sun", conversions: 142, revenue: 12200, visitors: 2850 },
  ];

  const conversionSources = [
    { name: "Organic Search", value: 35, color: "#8884d8" },
    { name: "Paid Ads", value: 28, color: "#82ca9d" },
    { name: "Social Media", value: 20, color: "#ffc658" },
    { name: "Email", value: 12, color: "#ff7300" },
    { name: "Direct", value: 5, color: "#0088fe" },
  ];

  const topPerformingPages = [
    { page: "/product-landing", conversions: 234, rate: "8.7%" },
    { page: "/pricing", conversions: 189, rate: "6.2%" },
    { page: "/features", conversions: 156, rate: "5.8%" },
    { page: "/demo", conversions: 142, rate: "9.1%" },
    { page: "/contact", conversions: 98, rate: "4.3%" },
  ];

  const totalConversions = conversionData.reduce((sum, item) => sum + item.conversions, 0);
  const totalRevenue = conversionData.reduce((sum, item) => sum + item.revenue, 0);
  const avgConversionRate = ((totalConversions / conversionData.reduce((sum, item) => sum + item.visitors, 0)) * 100).toFixed(2);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Conversions Tracking</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 text-sm font-medium flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalConversions}</div>
            <p className="text-white/65 text-sm flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
            <p className="text-white/65 text-sm flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
              +8.3% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{avgConversionRate}%</div>
            <p className="text-white/65 text-sm flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
              +2.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-400 text-sm font-medium flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Avg. Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${(totalRevenue / totalConversions).toFixed(0)}</div>
            <p className="text-white/65 text-sm flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
              +5.7% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Conversion Trends
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversions">Conversions</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="visitors">Visitors</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey={selectedMetric} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-white">Conversion Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conversionSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {conversionSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    ></div>
                    <span className="text-sm text-white">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Pages */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold text-white">#{index + 1}</div>
                  <div>
                    <p className="font-medium text-white">{page.page}</p>
                    <p className="text-sm text-white/65">Conversion Rate: {page.rate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{page.conversions}</p>
                  <p className="text-sm text-white/65">conversions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
