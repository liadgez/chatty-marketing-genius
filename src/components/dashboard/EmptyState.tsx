
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp, FileText } from "lucide-react";

interface EmptyStateProps {
  type: "experiments" | "tests" | "analytics" | "reports";
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case "experiments":
        return {
          icon: Target,
          title: "No experiments yet",
          description: "Start optimizing your conversions by creating your first A/B test experiment.",
          actionText: "Create First Experiment",
          tips: [
            "Test different headlines or call-to-action buttons",
            "Compare product page layouts",
            "Optimize your checkout process"
          ]
        };
      case "tests":
        return {
          icon: TrendingUp,
          title: "No active tests running",
          description: "Launch your first test to start gathering performance data and insights.",
          actionText: "Start New Test",
          tips: [
            "Define clear success metrics",
            "Set up proper tracking",
            "Ensure sufficient traffic for reliable results"
          ]
        };
      case "analytics":
        return {
          icon: TrendingUp,
          title: "No analytics data available",
          description: "Complete some tests to see performance analytics and conversion trends.",
          actionText: "View Test Setup Guide",
          tips: [
            "Run tests for at least 1-2 weeks",
            "Ensure statistical significance",
            "Monitor conversion rates daily"
          ]
        };
      case "reports":
        return {
          icon: FileText,
          title: "No reports generated",
          description: "Generate your first report to share insights and results with your team.",
          actionText: "Create Report",
          tips: [
            "Export test results as PDF",
            "Share key insights with stakeholders",
            "Track ROI and performance metrics"
          ]
        };
      default:
        return {
          icon: Target,
          title: "No data available",
          description: "Get started to see your data here.",
          actionText: "Get Started",
          tips: []
        };
    }
  };

  const content = getEmptyStateContent();
  const IconComponent = content.icon;

  return (
    <Card className="glass-effect border-white/10 bg-black/20">
      <CardContent className="p-8 md:p-12 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
          </div>

          {/* Title and Description */}
          <div className="space-y-3 max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {content.title}
            </h3>
            <p className="text-white/65 text-sm md:text-base leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Action Button */}
          {onAction && (
            <Button 
              onClick={onAction}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              {content.actionText}
            </Button>
          )}

          {/* Tips Section */}
          {content.tips.length > 0 && (
            <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg max-w-sm">
              <h4 className="text-sm font-medium text-blue-300 mb-2">💡 Quick Tips</h4>
              <ul className="text-xs text-white/60 space-y-1 text-left">
                {content.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
