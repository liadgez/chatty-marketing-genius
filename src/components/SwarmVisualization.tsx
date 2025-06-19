
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, Zap, Database, BarChart, Settings } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: "analyzer" | "optimizer" | "detector" | "processor";
  status: "active" | "idle" | "busy";
  currentTask?: string;
  performance: number;
}

export function SwarmVisualization() {
  const agents: Agent[] = [
    { id: "1", name: "Data Analyzer Alpha", type: "analyzer", status: "active", currentTask: "A/B Test Analysis", performance: 94 },
    { id: "2", name: "Anomaly Detector Beta", type: "detector", status: "busy", currentTask: "Revenue Stream Monitoring", performance: 87 },
    { id: "3", name: "Optimizer Gamma", type: "optimizer", status: "active", currentTask: "Campaign Optimization", performance: 91 },
    { id: "4", name: "Data Processor Delta", type: "processor", status: "idle", performance: 96 },
    { id: "5", name: "Statistical Engine Epsilon", type: "analyzer", status: "busy", currentTask: "Variant Testing", performance: 89 },
    { id: "6", name: "Quality Checker Zeta", type: "detector", status: "active", currentTask: "Data Validation", performance: 93 },
    { id: "7", name: "Performance Optimizer Eta", type: "optimizer", status: "idle", performance: 88 },
    { id: "8", name: "Stream Processor Theta", type: "processor", status: "active", currentTask: "Real-time Processing", performance: 92 },
  ];

  const getAgentIcon = (type: string) => {
    switch (type) {
      case "analyzer": return <BarChart className="w-5 h-5" />;
      case "optimizer": return <Zap className="w-5 h-5" />;
      case "detector": return <Activity className="w-5 h-5" />;
      case "processor": return <Database className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "busy": return "bg-blue-100 text-blue-800 border-blue-200";
      case "idle": return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "analyzer": return "text-purple-600 bg-purple-50";
      case "optimizer": return "text-orange-600 bg-orange-50";
      case "detector": return "text-red-600 bg-red-50";
      case "processor": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const activeAgents = agents.filter(a => a.status === "active" || a.status === "busy").length;
  const avgPerformance = Math.round(agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Agent Swarm Visualization</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {activeAgents} Active Agents
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {avgPerformance}% Avg Performance
          </Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{agents.filter(a => a.status === "active").length}</div>
            <p className="text-green-600 text-sm">Running tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-sm font-medium flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Busy Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{agents.filter(a => a.status === "busy").length}</div>
            <p className="text-blue-600 text-sm">Processing intensive tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-800 text-sm font-medium flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Idle Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{agents.filter(a => a.status === "idle").length}</div>
            <p className="text-gray-600 text-sm">Available for tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 text-sm font-medium flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Avg Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{avgPerformance}%</div>
            <p className="text-purple-600 text-sm">System efficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${getTypeColor(agent.type)}`}>
                  {getAgentIcon(agent.type)}
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-slate-800 mb-2">{agent.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Type:</span>
                  <span className="font-medium capitalize">{agent.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Performance:</span>
                  <span className="font-medium">{agent.performance}%</span>
                </div>
                {agent.currentTask && (
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Current Task:</p>
                    <p className="text-sm font-medium text-slate-800">{agent.currentTask}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-800">Processing Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Data Ingestion</span>
              </div>
              <div className="w-8 h-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Analysis</span>
              </div>
              <div className="w-8 h-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Detection</span>
              </div>
              <div className="w-8 h-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Optimization</span>
              </div>
              <div className="w-8 h-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Output</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
