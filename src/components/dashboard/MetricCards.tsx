
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Activity, Target, CheckCircle } from "lucide-react";
import { SkeletonCard } from "@/components/ui/skeleton-card";
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

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMetricClick = (metricId: string, action: string) => {
    console.log(`Metric clicked: ${metricId} - ${action}`);
    setSelectedMetric(metricId);
    
    // Reset selection after a short delay for visual feedback
    setTimeout(() => {
      setSelectedMetric(null);
    }, 200);
    
    // Here you would typically navigate to detailed view or trigger an action
    // For now, we'll just log the action
  };

  const handleKeyDown = (e: React.KeyboardEvent, metricId: string, action: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMetricClick(metricId, action);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.id}
          className={`glass-effect border-white/10 bg-black/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 group cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
            selectedMetric === metric.id ? 'border-blue-500/70 shadow-lg shadow-blue-500/20 scale-[1.02]' : ''
          }`}
          role="button"
          tabIndex={0}
          aria-label={`${metric.title}: ${metric.value}, ${metric.change}. Click to ${metric.action}`}
          onClick={() => handleMetricClick(metric.id, metric.action)}
          onKeyDown={(e) => handleKeyDown(e, metric.id, metric.action)}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-sm text-white/65 font-medium truncate">{metric.title}</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                      Click to view
                    </span>
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2 group-hover:text-blue-300 transition-colors duration-200">
                  {metric.value}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.change}
                  </p>
                  <p className="text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {metric.description}
                  </p>
                </div>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-600/40 group-hover:to-purple-600/40 transition-all duration-200 shrink-0 ml-3 ${
                selectedMetric === metric.id ? 'from-blue-600/50 to-purple-600/50' : ''
              }`}>
                <metric.icon className={`w-5 h-5 md:w-6 md:h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-200 ${
                  selectedMetric === metric.id ? 'scale-110' : ''
                }`} aria-hidden="true" />
              </div>
            </div>
            
            {/* Click indicator */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
