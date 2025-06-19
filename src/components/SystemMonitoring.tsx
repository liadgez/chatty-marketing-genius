
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Server, 
  Wifi 
} from "lucide-react";

const systemMetrics = [
  { time: "14:00", cpu: 45, memory: 67, network: 23, disk: 34 },
  { time: "14:05", cpu: 52, memory: 69, network: 28, disk: 36 },
  { time: "14:10", cpu: 48, memory: 71, network: 25, disk: 38 },
  { time: "14:15", cpu: 43, memory: 68, network: 31, disk: 35 },
  { time: "14:20", cpu: 47, memory: 72, network: 27, disk: 37 },
  { time: "14:25", cpu: 51, memory: 70, network: 24, disk: 39 },
];

const errorLogs = [
  { timestamp: "14:23:45", level: "ERROR", component: "DataProcessor", message: "Timeout processing batch 847" },
  { timestamp: "14:18:32", level: "WARN", component: "AnomalyDetector", message: "High variance detected in revenue stream" },
  { timestamp: "14:12:18", level: "ERROR", component: "DatabaseConnection", message: "Connection retry attempt 2/3" },
  { timestamp: "14:08:56", level: "INFO", component: "TaskManager", message: "Task queue processed successfully" },
  { timestamp: "14:05:23", level: "WARN", component: "MemoryManager", message: "Memory usage approaching 75% threshold" },
];

export function SystemMonitoring() {
  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR": return "text-red-600 bg-red-50";
      case "WARN": return "text-yellow-600 bg-yellow-50";
      case "INFO": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">System Monitoring</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-sm font-medium flex items-center">
              <Server className="w-4 h-4 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">Operational</div>
            <p className="text-green-600 text-sm">All services running</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">47%</div>
            <p className="text-blue-600 text-sm">Normal load</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-sm font-medium flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">72%</div>
            <p className="text-purple-600 text-sm">Within limits</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 text-sm font-medium flex items-center">
              <Wifi className="w-4 h-4 mr-2" />
              Network I/O
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">27 MB/s</div>
            <p className="text-orange-600 text-sm">Stable connection</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">System Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemMetrics}>
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
                    <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="network" stroke="#10b981" strokeWidth={2} name="Network %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Disk Usage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={systemMetrics}>
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
                    <Area type="monotone" dataKey="disk" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-800">Service Health Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { service: "API Gateway", status: "healthy", response: "< 100ms" },
                  { service: "Database", status: "healthy", response: "< 50ms" },
                  { service: "Cache Layer", status: "healthy", response: "< 10ms" },
                  { service: "Message Queue", status: "healthy", response: "< 25ms" },
                  { service: "File Storage", status: "warning", response: "< 200ms" },
                  { service: "Analytics Engine", status: "healthy", response: "< 150ms" },
                ].map((service) => (
                  <div key={service.service} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800">{service.service}</h4>
                      <Badge 
                        className={
                          service.status === "healthy" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">Response: {service.response}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {errorLogs.map((log, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getLogLevelColor(log.level)}>
                            {log.level}
                          </Badge>
                          <span className="text-sm text-slate-600">{log.component}</span>
                        </div>
                        <span className="text-sm text-slate-500">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-800">{log.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-yellow-800">Memory Usage High</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                    </div>
                    <p className="text-sm text-yellow-700">Memory usage at 72% - approaching threshold</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-blue-800">High Traffic Detected</h4>
                      <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                    </div>
                    <p className="text-sm text-blue-700">Traffic increased by 34% in the last hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Resolved Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-700">Database Connection Issue</h4>
                      <Badge className="bg-gray-100 text-gray-600">Resolved</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Connection restored after retry attempts</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-700">Task Processing Delay</h4>
                      <Badge className="bg-gray-100 text-gray-600">Resolved</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Queue processed successfully, no backlog</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
