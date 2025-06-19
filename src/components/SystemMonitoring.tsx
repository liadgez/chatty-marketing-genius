
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
      case "ERROR": return "text-red-300 bg-red-500/20 border border-red-500/30";
      case "WARN": return "text-yellow-300 bg-yellow-500/20 border border-yellow-500/30";
      case "INFO": return "text-blue-300 bg-blue-500/20 border border-blue-500/30";
      default: return "text-white/70 bg-white/10 border border-white/20";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">System Monitoring</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-300 text-sm font-medium flex items-center">
              <Server className="w-4 h-4 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Operational</div>
            <p className="text-white/70 text-sm">All services running</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-300 text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">47%</div>
            <p className="text-white/70 text-sm">Normal load</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-300 text-sm font-medium flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">72%</div>
            <p className="text-white/70 text-sm">Within limits</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-300 text-sm font-medium flex items-center">
              <Wifi className="w-4 h-4 mr-2" />
              Network I/O
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">27 MB/s</div>
            <p className="text-white/70 text-sm">Stable connection</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 card-gradient border-white/10">
          <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">Performance Metrics</TabsTrigger>
          <TabsTrigger value="logs" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">System Logs</TabsTrigger>
          <TabsTrigger value="alerts" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">Alerts & Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">System Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="network" stroke="#10b981" strokeWidth={2} name="Network %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Disk Usage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={systemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Area type="monotone" dataKey="disk" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white">Service Health Checks</CardTitle>
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
                  <div key={service.service} className="p-4 card-gradient border border-white/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{service.service}</h4>
                      <Badge 
                        className={
                          service.status === "healthy" 
                            ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        }
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70">Response: {service.response}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {errorLogs.map((log, index) => (
                    <div key={index} className="p-3 card-gradient rounded-lg border-l-4 border-white/20">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getLogLevelColor(log.level)}>
                            {log.level}
                          </Badge>
                          <span className="text-sm text-white/70">{log.component}</span>
                        </div>
                        <span className="text-sm text-white/50">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-white">{log.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-yellow-300">Memory Usage High</h4>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Warning</Badge>
                    </div>
                    <p className="text-sm text-yellow-200">Memory usage at 72% - approaching threshold</p>
                  </div>
                  
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-blue-300">High Traffic Detected</h4>
                      <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30">Info</Badge>
                    </div>
                    <p className="text-sm text-blue-200">Traffic increased by 34% in the last hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Resolved Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 card-gradient border border-white/10 rounded-lg opacity-75">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white/70">Database Connection Issue</h4>
                      <Badge className="bg-white/10 text-white/60 border border-white/20">Resolved</Badge>
                    </div>
                    <p className="text-sm text-white/60">Connection restored after retry attempts</p>
                  </div>
                  
                  <div className="p-3 card-gradient border border-white/10 rounded-lg opacity-75">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white/70">Task Processing Delay</h4>
                      <Badge className="bg-white/10 text-white/60 border border-white/20">Resolved</Badge>
                    </div>
                    <p className="text-sm text-white/60">Queue processed successfully, no backlog</p>
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
