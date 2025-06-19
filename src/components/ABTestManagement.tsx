
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  Eye, 
  TrendingUp,
  Users,
  DollarSign,
  MousePointer
} from "lucide-react";

interface Experiment {
  id: string;
  name: string;
  status: 'running' | 'paused' | 'completed' | 'draft';
  progress: number;
  traffic: number;
  conversions: {
    a: number;
    b: number;
  };
  metrics: {
    ctr: { a: number; b: number };
    roas: { a: number; b: number };
    cpd: { a: number; b: number };
  };
  startDate: string;
  endDate: string;
  hypothesis: string;
}

const mockExperiments: Experiment[] = [
  {
    id: "exp-001",
    name: "Landing Page Hero CTA Button",
    status: "running",
    progress: 65,
    traffic: 2840,
    conversions: { a: 89, b: 112 },
    metrics: {
      ctr: { a: 3.2, b: 3.9 },
      roas: { a: 4.1, b: 4.8 },
      cpd: { a: 12.50, b: 9.80 }
    },
    startDate: "2024-06-15",
    endDate: "2024-06-29",
    hypothesis: "Changing CTA from 'Learn More' to 'Get Started' will increase conversion rate"
  },
  {
    id: "exp-002", 
    name: "Email Subject Line A/B Test",
    status: "running",
    progress: 89,
    traffic: 5240,
    conversions: { a: 178, b: 203 },
    metrics: {
      ctr: { a: 2.8, b: 3.4 },
      roas: { a: 3.6, b: 4.2 },
      cpd: { a: 15.20, b: 11.90 }
    },
    startDate: "2024-06-10",
    endDate: "2024-06-24",
    hypothesis: "Personalized subject lines will improve open rates by 15%"
  },
  {
    id: "exp-003",
    name: "Product Page Layout Test",
    status: "paused",
    progress: 23,
    traffic: 892,
    conversions: { a: 24, b: 18 },
    metrics: {
      ctr: { a: 2.1, b: 1.8 },
      roas: { a: 2.9, b: 2.4 },
      cpd: { a: 18.40, b: 22.10 }
    },
    startDate: "2024-06-18",
    endDate: "2024-07-02",
    hypothesis: "Simplified product layout will reduce bounce rate and increase purchases"
  }
];

export function ABTestManagement() {
  const [experiments] = useState<Experiment[]>(mockExperiments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || exp.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "paused": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "completed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "draft": return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getWinner = (metricA: number, metricB: number, higherIsBetter: boolean = true) => {
    if (higherIsBetter) {
      return metricB > metricA ? "B" : metricA > metricB ? "A" : null;
    } else {
      return metricA > metricB ? "B" : metricB > metricA ? "A" : null;
    }
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            A/B Testing
          </h1>
          <p className="text-muted-foreground mt-2">Manage and monitor your marketing experiments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Test
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-foreground">{experiments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Play className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-2xl font-bold text-foreground">
                  {experiments.filter(e => e.status === 'running').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <Users className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Traffic</p>
                <p className="text-2xl font-bold text-foreground">
                  {experiments.reduce((sum, exp) => sum + exp.traffic, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Lift</p>
                <p className="text-2xl font-bold text-foreground">+18.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experiments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50"
          />
        </div>
        <div className="flex items-center space-x-2">
          {["all", "running", "paused", "completed"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={selectedFilter === filter 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "border-white/10 hover:bg-white/5"
              }
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Experiments List */}
      <div className="space-y-6">
        {filteredExperiments.map((experiment) => (
          <Card key={experiment.id} className="glass-effect border-white/10 hover:border-white/20 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CardTitle className="text-foreground">{experiment.name}</CardTitle>
                  <Badge variant="outline" className={getStatusColor(experiment.status)}>
                    {experiment.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="hover:bg-white/10">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {experiment.status === "running" ? (
                    <Button variant="ghost" size="sm" className="hover:bg-white/10">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  ) : experiment.status === "paused" ? (
                    <Button variant="ghost" size="sm" className="hover:bg-white/10">
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Progress and Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium text-foreground">{experiment.progress}%</span>
                    </div>
                    <Progress value={experiment.progress} className="h-2 bg-muted" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Traffic</p>
                    <p className="text-lg font-bold text-foreground">{experiment.traffic.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Conversions</p>
                    <p className="text-lg font-bold text-foreground">
                      {(experiment.conversions.a + experiment.conversions.b).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* A/B Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center">
                      <MousePointer className="h-4 w-4 mr-2 text-blue-400" />
                      Click-Through Rate
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Variant A</p>
                        <p className="text-lg font-bold text-foreground">{experiment.metrics.ctr.a}%</p>
                      </div>
                      <div className="px-4">
                        {getWinner(experiment.metrics.ctr.a, experiment.metrics.ctr.b) && (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                            {getWinner(experiment.metrics.ctr.a, experiment.metrics.ctr.b)} Wins
                          </Badge>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Variant B</p>
                        <p className="text-lg font-bold text-foreground">{experiment.metrics.ctr.b}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                      ROAS
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Variant A</p>
                        <p className="text-lg font-bold text-foreground">{experiment.metrics.roas.a}x</p>
                      </div>
                      <div className="px-4">
                        {getWinner(experiment.metrics.roas.a, experiment.metrics.roas.b) && (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                            {getWinner(experiment.metrics.roas.a, experiment.metrics.roas.b)} Wins
                          </Badge>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Variant B</p>
                        <p className="text-lg font-bold text-foreground">{experiment.metrics.roas.b}x</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center">
                      <Target className="h-4 w-4 mr-2 text-purple-400" />
                      Cost Per Conversion
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Variant A</p>
                        <p className="text-lg font-bold text-foreground">${experiment.metrics.cpd.a}</p>
                      </div>
                      <div className="px-4">
                        {getWinner(experiment.metrics.cpd.a, experiment.metrics.cpd.b, false) && (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                            {getWinner(experiment.metrics.cpd.a, experiment.metrics.cpd.b, false)} Wins
                          </Badge>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Variant B</p>
                        <p className="text-lg font-bold text-foreground">${experiment.metrics.cpd.b}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hypothesis */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-muted-foreground mb-1">Hypothesis</p>
                  <p className="text-foreground">{experiment.hypothesis}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
