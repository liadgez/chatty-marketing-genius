
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

  const getTypeColor = (category?: string) => {
    switch (category) {
      case "conversation": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "analysis": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "report": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "log": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "generating": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Generated Outputs & Reports</h2>
        <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          {reports.filter(r => r.status === "ready").length} Files Ready
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-effect border-white/20 focus:border-blue-500/50 focus:ring-blue-500/25 bg-background/50 text-white placeholder:text-white/50"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 glass-effect border-white/20 text-white bg-background/50 rounded-md text-sm focus:border-blue-500/50"
        >
          <option value="all" className="bg-background text-white">All Types</option>
          <option value="conversation" className="bg-background text-white">Conversations</option>
          <option value="analysis" className="bg-background text-white">Analysis</option>
          <option value="report" className="bg-background text-white">Reports</option>
          <option value="log" className="bg-background text-white">Logs</option>
        </select>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass-effect">
          <TabsTrigger value="files" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">File Browser</TabsTrigger>
          <TabsTrigger value="preview" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">Content Preview</TabsTrigger>
          <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">Download Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="glass-effect hover:bg-white/10 transition-all border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(report.type)}`}>
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{report.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-white/65 mt-1">
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
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
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
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">ab_test_conversation.txt</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 glass-effect p-4 rounded-lg border-white/10">
                <div className="font-mono text-sm space-y-2">
                  <div className="text-blue-400">[2024-06-19 10:15:23] User: I want to start a new A/B test for our landing page</div>
                  <div className="text-emerald-400">[2024-06-19 10:15:24] Assistant: I'll help you set up an A/B test. What's the main goal of this test?</div>
                  <div className="text-blue-400">[2024-06-19 10:15:45] User: We want to test two different headlines to see which converts better</div>
                  <div className="text-emerald-400">[2024-06-19 10:15:46] Assistant: Perfect! Please provide me with:</div>
                  <div className="text-emerald-400">1. Control headline (Version A)</div>
                  <div className="text-emerald-400">2. Test headline (Version B)</div>
                  <div className="text-emerald-400">3. Target conversion metric</div>
                  <div className="text-emerald-400">4. Expected test duration</div>
                  <div className="text-blue-400">[2024-06-19 10:16:12] User: Version A: "Transform Your Business Today"</div>
                  <div className="text-blue-400">Version B: "Double Your Revenue in 30 Days"</div>
                  <div className="text-blue-400">Metric: Click-through rate to signup</div>
                  <div className="text-blue-400">Duration: 2 weeks</div>
                  <div className="text-emerald-400">[2024-06-19 10:16:13] Assistant: Excellent! I'm configuring your A/B test with these parameters...</div>
                  <div className="text-white/60">[Test configuration details would continue...]</div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-sm">Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">1,247</div>
                <p className="text-sm text-white/65">This month</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-sm">Most Downloaded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-white">Analysis Reports</div>
                <p className="text-sm text-white/65">45% of downloads</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-sm">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">12.3 GB</div>
                <p className="text-sm text-white/65">Of 50 GB available</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Download Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { file: "campaign_2024_q2_analysis.csv", time: "2 hours ago", user: "Marketing Team" },
                  { file: "anomaly_detection_report.pdf", time: "4 hours ago", user: "Data Science Team" },
                  { file: "run_report.csv", time: "6 hours ago", user: "Operations Team" },
                  { file: "conversation_summary.txt", time: "8 hours ago", user: "Product Team" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg border-white/10">
                    <div>
                      <p className="font-medium text-white">{activity.file}</p>
                      <p className="text-sm text-white/65">Downloaded by {activity.user}</p>
                    </div>
                    <span className="text-sm text-white/50">{activity.time}</span>
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
