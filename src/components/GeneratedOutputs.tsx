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
  Filter,
  Database,
  Eye,
  Target,
  TrendingUp,
  MapPin,
  Clock,
  Brain,
  Zap,
  Globe
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: "conversation" | "analysis" | "report" | "log";
  date: Date;
  size: string;
  status: "ready" | "generating" | "error";
}

interface AdInsight {
  id: string;
  brand: string;
  adText: string;
  hook: string;
  pain: string;
  solution: string;
  cta: string;
  countries: string[];
  positioning: string;
  spend: string;
  impressions: string;
  createdDate: Date;
}

export function GeneratedOutputs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [adSearchTerm, setAdSearchTerm] = useState("");

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

  const adInsights: AdInsight[] = [
    {
      id: "1",
      brand: "Nike",
      adText: "Just Do It. Transform your workout with our revolutionary new Air Max series.",
      hook: "Just Do It",
      pain: "Uncomfortable workouts",
      solution: "Revolutionary Air Max technology",
      cta: "Shop Now",
      countries: ["US", "CA", "UK", "FR"],
      positioning: "Brand awareness",
      spend: "$12,500",
      impressions: "2.1M",
      createdDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: "2", 
      brand: "Shopify",
      adText: "Struggling to sell online? Launch your store in minutes, not months.",
      hook: "Struggling to sell online?",
      pain: "Complex e-commerce setup",
      solution: "Quick store launch",
      cta: "Start Free Trial",
      countries: ["US", "CA", "AU", "GB"],
      positioning: "Direct response",
      spend: "$8,750",
      impressions: "1.8M",
      createdDate: new Date(Date.now() - 48 * 60 * 60 * 1000)
    },
    {
      id: "3",
      brand: "Coursera",
      adText: "Career stuck? Advance with Google certificates trusted by top employers.",
      hook: "Career stuck?",
      pain: "Career stagnation", 
      solution: "Google certificates",
      cta: "Enroll Today",
      countries: ["US", "IN", "BR", "MX"],
      positioning: "Direct response",
      spend: "$15,200",
      impressions: "3.2M",
      createdDate: new Date(Date.now() - 72 * 60 * 60 * 1000)
    }
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

  const getPositioningColor = (positioning: string) => {
    switch (positioning) {
      case "Brand awareness": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Direct response": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Event promo": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  const filteredAdInsights = adInsights.filter(ad => 
    ad.brand.toLowerCase().includes(adSearchTerm.toLowerCase()) ||
    ad.adText.toLowerCase().includes(adSearchTerm.toLowerCase()) ||
    ad.hook.toLowerCase().includes(adSearchTerm.toLowerCase())
  );

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
        <TabsList className="grid w-full grid-cols-4 card-gradient">
          <TabsTrigger value="files" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">File Browser</TabsTrigger>
          <TabsTrigger value="preview" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">Content Preview</TabsTrigger>
          <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">Download Analytics</TabsTrigger>
          <TabsTrigger value="ad-research" className="text-white data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-400">Ad Research</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="card-gradient hover:bg-white/10 transition-all border-white/10">
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
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white">ab_test_conversation.txt</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 card-gradient p-4 rounded-lg border-white/10">
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
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white text-sm">Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">1,247</div>
                <p className="text-sm text-white/65">This month</p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white text-sm">Most Downloaded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-white">Analysis Reports</div>
                <p className="text-sm text-white/65">45% of downloads</p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white text-sm">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">12.3 GB</div>
                <p className="text-sm text-white/65">Of 50 GB available</p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-gradient">
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
                  <div key={index} className="flex items-center justify-between p-3 card-gradient rounded-lg border-white/10">
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

        <TabsContent value="ad-research" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Facebook Ad-Library Analyzer</h3>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Database className="w-3 h-3 mr-1" />
                Connected to Meta API
              </Badge>
              <Button size="sm" className="bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30">
                <Zap className="w-4 h-4 mr-2" />
                Run Analysis
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search brands, hooks, or ad content..."
                value={adSearchTerm}
                onChange={(e) => setAdSearchTerm(e.target.value)}
                className="pl-10 glass-effect border-white/20 focus:border-blue-500/50 focus:ring-blue-500/25 bg-background/50 text-white placeholder:text-white/50"
              />
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/65">Total Ads</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">15,247</div>
              </CardContent>
            </Card>
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white/65">Brands Tracked</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">324</div>
              </CardContent>
            </Card>
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white/65">Countries</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">28</div>
              </CardContent>
            </Card>
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-white/65">Total Spend</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">$2.1M</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {filteredAdInsights.map((ad) => (
              <Card key={ad.id} className="card-gradient hover:bg-white/10 transition-all border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-lg">{ad.brand}</h4>
                          <div className="flex items-center space-x-2 text-sm text-white/65">
                            <Clock className="w-3 h-3" />
                            {ad.createdDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPositioningColor(ad.positioning)}>
                          {ad.positioning}
                        </Badge>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Eye className="w-4 h-4 mr-2" />
                          View Ad
                        </Button>
                      </div>
                    </div>

                    <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                      <p className="text-white text-sm leading-relaxed">{ad.adText}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-white">Hook</span>
                        </div>
                        <p className="text-sm text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                          {ad.hook}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-red-400" />
                          <span className="text-sm font-medium text-white">Pain Point</span>
                        </div>
                        <p className="text-sm text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                          {ad.pain}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Brain className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-medium text-white">Solution</span>
                        </div>
                        <p className="text-sm text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                          {ad.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{ad.spend}</div>
                          <div className="text-xs text-white/65">Spend</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{ad.impressions}</div>
                          <div className="text-xs text-white/65">Impressions</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-white/50" />
                          <span className="text-sm text-white/65">{ad.countries.join(", ")}</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        CTA: {ad.cta}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Data Pipeline Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-emerald-400">Data Fetch</div>
                    <div className="text-xs text-emerald-400/70">Active</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-blue-400">NLP Analysis</div>
                    <div className="text-xs text-blue-400/70">Processing</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-purple-400">Embeddings</div>
                    <div className="text-xs text-purple-400/70">Generating</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-orange-400">Insights</div>
                    <div className="text-xs text-orange-400/70">Ready</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
