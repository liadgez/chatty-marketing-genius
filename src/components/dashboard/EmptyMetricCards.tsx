
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, HelpCircle } from "lucide-react";

interface EmptyMetricCardsProps {
  onCreateExperiment?: () => void;
}

export function EmptyMetricCards({ onCreateExperiment }: EmptyMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Create First Experiment Card */}
      <Card className="glass-effect border-white/10 bg-black/20 border-dashed border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 group cursor-pointer"
            onClick={onCreateExperiment}
            role="button"
            tabIndex={0}>
        <CardContent className="p-4 md:p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-600/40 group-hover:to-purple-600/40 transition-all duration-200">
              <Plus className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-1">Create First Experiment</p>
              <p className="text-xs text-white/65">Start testing variations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder Cards */}
      {[
        { title: "Total Experiments", description: "Track all tests" },
        { title: "Active Tests", description: "Monitor running tests" },
        { title: "Average ROAS", description: "Measure performance" }
      ].map((item, index) => (
        <Card key={index} className="glass-effect border-white/10 bg-black/20 opacity-50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-white/45 font-medium mb-2">{item.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-white/30">--</p>
                <p className="text-xs text-white/30 mt-1">{item.description}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-white/30" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
