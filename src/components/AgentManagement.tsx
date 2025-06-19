
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Settings, Plus, Edit, Trash2, Play, Pause } from "lucide-react";

export function AgentManagement() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    { id: "1", name: "Data Analyzer Alpha", type: "analyzer", status: "active", tasks: 3, efficiency: 94 },
    { id: "2", name: "Anomaly Detector Beta", type: "detector", status: "busy", tasks: 1, efficiency: 87 },
    { id: "3", name: "Optimizer Gamma", type: "optimizer", status: "active", tasks: 2, efficiency: 91 },
    { id: "4", name: "Data Processor Delta", type: "processor", status: "idle", tasks: 0, efficiency: 96 },
  ];

  const configurations = [
    { key: "processing_threads", value: "4", description: "Number of parallel processing threads" },
    { key: "batch_size", value: "1000", description: "Data processing batch size" },
    { key: "timeout_seconds", value: "300", description: "Task timeout in seconds" },
    { key: "retry_attempts", value: "3", description: "Number of retry attempts for failed tasks" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Agent Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Deploy New Agent
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <Card 
                key={agent.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer card-gradient border-white/10 ${
                  selectedAgent === agent.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Brain className="w-8 h-8 text-blue-400" />
                    <Badge variant={agent.status === "active" ? "default" : agent.status === "busy" ? "secondary" : "outline"}>
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-white mb-2">{agent.name}</h3>
                  <div className="space-y-1 text-sm text-white/65">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium capitalize text-white">{agent.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Tasks:</span>
                      <span className="font-medium text-white">{agent.tasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency:</span>
                      <span className="font-medium text-white">{agent.efficiency}%</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      {agent.status === "active" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedAgent && (
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Agent Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Current Tasks</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="font-medium text-white">A/B Test Analysis</p>
                        <p className="text-sm text-white/65">Progress: 67%</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="font-medium text-white">Data Validation</p>
                        <p className="text-sm text-white/65">Progress: 23%</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/65">Success Rate:</span>
                        <span className="font-medium text-white">98.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/65">Avg Processing Time:</span>
                        <span className="font-medium text-white">2.3s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/65">Memory Usage:</span>
                        <span className="font-medium text-white">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/65">CPU Usage:</span>
                        <span className="font-medium text-white">32%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white">Global Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {configurations.map((config) => (
                  <div key={config.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{config.key.replace(/_/g, ' ').toUpperCase()}</h4>
                      <p className="text-sm text-white/65">{config.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input value={config.value} className="w-20 text-center bg-white/10 border-white/20 text-white" />
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Agent Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between">
                      <span className="text-white">{agent.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${agent.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white">{agent.efficiency}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">System Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">CPU Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-white">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Memory Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-white">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Network I/O</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-white">23%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white">Agent Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/50 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                <div>[2024-06-19 14:23:15] Agent Alpha: Task 'AB_TEST_001' completed successfully</div>
                <div>[2024-06-19 14:22:48] Agent Beta: Anomaly detected in revenue stream - confidence: 87%</div>
                <div>[2024-06-19 14:22:31] Agent Gamma: Optimization iteration 3/5 completed</div>
                <div>[2024-06-19 14:22:15] Agent Delta: Data processing batch 45/50 completed</div>
                <div>[2024-06-19 14:21:59] Agent Alpha: Starting new task 'QUALITY_CHECK_003'</div>
                <div>[2024-06-19 14:21:42] System: All agents operational - performance nominal</div>
                <div>[2024-06-19 14:21:25] Agent Beta: Monitoring 15 data streams for anomalies</div>
                <div>[2024-06-19 14:21:08] Agent Gamma: Campaign optimization parameters updated</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
