
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Activity, Target, CheckCircle } from "lucide-react";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { EmptyMetricCards } from "./EmptyMetricCards";
import { useState, useEffect } from "react";

const metrics = [
  {
    id: "total-experiments",
    title: "Total Experiments",
    value: "156",
    change: "+12%",
    changeType: "positive" as const,
    icon: Activity,
    description: "All experiments created",
    action: "View all experiments"
  },
  {
    id: "active-tests",
    title: "Active Tests",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: Target,
    description: "Currently running tests",
    action: "Manage active tests"
  },
  {
    id: "avg-roas",
    title: "Avg ROAS",
    value: "4.2x",
    change: "+0.3x",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Return on ad spend",
    action: "View ROAS analytics"
  },
  {
    id: "completed-tests",
    title: "Completed Tests",
    value: "132",
    change: "+8",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "Successfully completed tests",
    action: "View test results"
  },
];

export function MetricCards() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMetricClick = (metricId: string, action: string) => {
    console.log(`Metric clicked: ${metricId} - ${action}`);
    setSelectedMetric(metricId);
    
    setTimeout(() => {
      setSelectedMetric(null);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent, metricId: string, action: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMetricClick(metricId, action);
    }
  };

  const handleCreateExperiment = () => {
    console.log("Creating first experiment...");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!hasData) {
    return <EmptyMetricCards onCreateExperiment={handleCreateExperiment} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
      {metrics.map((metric) => (
        <Card 
          key={metric.id}
          className={`glass-effect border-white/10 bg-white/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer transform hover:scale-[1.03] active:scale-[0.98] rounded-xl backdrop-blur-md ${
            selectedMetric === metric.id ? 'border-blue-500/50 shadow-xl shadow-blue-500/20 scale-[1.03]' : ''
          }`}
          role="button"
          tabIndex={0}
          aria-label={`${metric.title}: ${metric.value}, ${metric.change}. Click to ${metric.action}`}
          onClick={() => handleMetricClick(metric.id, metric.action)}
          onKeyDown={(e) => handleKeyDown(e, metric.id, metric.action)}
        >
          <CardContent className="p-4 sm:p-6 md:p-6 lg:p-8">
            <div className="flex items-start justify-between space-x-3 sm:space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-white/70 font-medium mb-2 sm:mb-3 truncate">{metric.title}</p>
                <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {metric.value}
                </p>
                <div className="flex items-center justify-between">
                  <p className={`text-xs sm:text-sm font-semibold ${
                    metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.change}
                  </p>
                </div>
                <p className="text-xs text-white/50 mt-1 sm:mt-2">
                  {metric.description}
                </p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300 shrink-0 ${
                selectedMetric === metric.id ? 'from-blue-600/40 to-purple-600/40 scale-110' : ''
              }`}>
                <metric.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-400 group-hover:text-blue-300 transition-all duration-300 ${
                  selectedMetric === metric.id ? 'scale-110' : ''
                }`} aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
