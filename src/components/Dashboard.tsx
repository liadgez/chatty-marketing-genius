
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

const performanceData = [
  { name: "Jan", experiments: 24, success: 18 },
  { name: "Feb", experiments: 31, success: 25 },
  { name: "Mar", experiments: 28, success: 22 },
  { name: "Apr", experiments: 35, success: 29 },
  { name: "May", experiments: 42, success: 37 },
  { name: "Jun", experiments: 38, success: 33 },
];

const anomalyData = [
  { time: "00:00", normal: 95, anomalies: 5 },
  { time: "04:00", normal: 87, anomalies: 13 },
  { time: "08:00", normal: 92, anomalies: 8 },
  { time: "12:00", normal: 89, anomalies: 11 },
  { time: "16:00", normal: 94, anomalies: 6 },
  { time: "20:00", normal: 91, anomalies: 9 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">System Overview</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-sm font-medium">Active Experiments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">24</div>
            <p className="text-blue-600 text-sm">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-emerald-800 text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900">87.3%</div>
            <Progress value={87.3} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-sm font-medium">Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">95.7%</div>
            <p className="text-amber-600 text-sm">Excellent quality</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">8</div>
            <p className="text-purple-600 text-sm">Processing tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800">Experiment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="experiments" fill="#3b82f6" name="Total Experiments" />
                <Bar dataKey="success" fill="#10b981" name="Successful" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800">Anomaly Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Area type="monotone" dataKey="normal" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="anomalies" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-800">Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, task: "A/B Test Analysis - Campaign 2024-Q2", status: "completed", time: "2 hours ago" },
              { id: 2, task: "Anomaly Detection - Revenue Stream", status: "running", time: "4 hours ago" },
              { id: 3, task: "Variant Optimization - Landing Page", status: "pending", time: "6 hours ago" },
              { id: 4, task: "Data Quality Check - User Metrics", status: "completed", time: "8 hours ago" },
            ].map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{task.task}</h4>
                  <p className="text-sm text-slate-600">{task.time}</p>
                </div>
                <Badge
                  variant={task.status === "completed" ? "default" : task.status === "running" ? "secondary" : "outline"}
                  className={
                    task.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : task.status === "running" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
