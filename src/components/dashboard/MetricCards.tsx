
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Activity, Target, CheckCircle } from "lucide-react";

const metrics = [
  {
    title: "Total Experiments",
    value: "156",
    change: "+12%",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "Active Tests",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "Avg ROAS",
    value: "4.2x",
    change: "+0.3x",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Completed Tests",
    value: "132",
    change: "+8",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card 
          key={index}
          className="glass-effect border-white/10 bg-black/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 group cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/65 font-medium">{metric.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                <p className={`text-sm mt-1 font-medium ${
                  metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-200">
                <metric.icon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
