
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Filter 
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: "conversation" | "analysis" | "report" | "log";
  date: Date;
  size: string;
  status: "ready" | "generating" | "error";
}

export function GeneratedOutputs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const reports: Report[] = [
    { id: "1", name: "ab_test_conversation.txt", type: "conversation", date: new Date(Date.now() - 2 * 60 * 60 * 1000), size: "45 KB", status: "ready" },
    { id: "2", name: "campaign_2024_q2_analysis.csv", type: "analysis", date: new Date(Date.now() - 4 * 60 * 60 * 1000), size: "1.2 MB", status: "ready" },
    { id: "3", name: "anomaly_detection_report.pdf", type: "report", date: new Date(Date.now() - 6 * 60 * 60 * 1000), size: "890 KB", status: "ready" },
    { id: "4", name: "run_report.csv", type: "report", date: new Date(Date.now() - 8 * 60 * 60 * 1000), size: "234 KB", status: "ready" },
    { id: "5", name: "conversation_summary.txt", type: "conversation", date: new Date(Date.now() - 10 * 60 * 60 * 1000), size: "12 KB", status: "ready" },
    { id: "6", name: "optimization_results.json", type: "analysis", date: new Date(Date.now() - 12 * 60 * 60 * 1000), size: "567 KB", status: "ready" },
    { id: "7", name: "agent_performance_log.txt", type: "log", date: new Date(Date.now() - 14 * 60 * 60 * 1000), size: "789 KB", status: "ready" },
    { id: "8", name: "weekly_insights_report.pdf", type: "report", date: new Date(), size: "Processing...", status: "generating" },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conversation": return <MessageSquare className="w-4 h-4" />;
      case "analysis": return <BarChart3 className="w-4 h-4" />;
      case "report": return <FileText className="w-4 h-4" />;
      case "log": return <Settings className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "conversation": return "bg-blue-100 text-blue-800";
      case "analysis": return "bg-purple-100 text-purple-800";
      case "report": return "bg-green-100 text-green-800";
      case "log": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "generating": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Generated Outputs & Reports</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {reports.filter(r => r.status === "ready").length} Files Ready
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          <option value="all">All Types</option>
          <option value="conversation">Conversations</option>
          <option value="analysis">Analysis</option>
          <option value="report">Reports</option>
          <option value="log">Logs</option>
        </select>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">File Browser</TabsTrigger>
          <TabsTrigger value="preview">Content Preview</TabsTrigger>
          <TabsTrigger value="analytics">Download Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(report.type)}`}>
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{report.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {report.date.toLocaleDateString()} {report.date.toLocaleTimeString()}
                          </span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.status === "ready" && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-800">ab_test_conversation.txt</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 bg-slate-50 p-4 rounded-lg">
                <div className="font-mono text-sm space-y-2">
                  <div className="text-blue-600">[2024-06-19 10:15:23] User: I want to start a new A/B test for our landing page</div>
                  <div className="text-green-600">[2024-06-19 10:15:24] Assistant: I'll help you set up an A/B test. What's the main goal of this test?</div>
                  <div className="text-blue-600">[2024-06-19 10:15:45] User: We want to test two different headlines to see which converts better</div>
                  <div className="text-green-600">[2024-06-19 10:15:46] Assistant: Perfect! Please provide me with:</div>
                  <div className="text-green-600">1. Control headline (Version A)</div>
                  <div className="text-green-600">2. Test headline (Version B)</div>
                  <div className="text-green-600">3. Target conversion metric</div>
                  <div className="text-green-600">4. Expected test duration</div>
                  <div className="text-blue-600">[2024-06-19 10:16:12] User: Version A: "Transform Your Business Today"</div>
                  <div className="text-blue-600">Version B: "Double Your Revenue in 30 Days"</div>
                  <div className="text-blue-600">Metric: Click-through rate to signup</div>
                  <div className="text-blue-600">Duration: 2 weeks</div>
                  <div className="text-green-600">[2024-06-19 10:16:13] Assistant: Excellent! I'm configuring your A/B test with these parameters...</div>
                  <div className="text-gray-600">[Test configuration details would continue...]</div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800 text-sm">Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">1,247</div>
                <p className="text-sm text-slate-600">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800 text-sm">Most Downloaded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-slate-800">Analysis Reports</div>
                <p className="text-sm text-slate-600">45% of downloads</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800 text-sm">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">12.3 GB</div>
                <p className="text-sm text-slate-600">Of 50 GB available</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-800">Recent Download Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { file: "campaign_2024_q2_analysis.csv", time: "2 hours ago", user: "Marketing Team" },
                  { file: "anomaly_detection_report.pdf", time: "4 hours ago", user: "Data Science Team" },
                  { file: "run_report.csv", time: "6 hours ago", user: "Operations Team" },
                  { file: "conversation_summary.txt", time: "8 hours ago", user: "Product Team" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{activity.file}</p>
                      <p className="text-sm text-slate-600">Downloaded by {activity.user}</p>
                    </div>
                    <span className="text-sm text-slate-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
