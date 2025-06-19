
import { Button } from "@/components/ui/button";
import { Plus, HelpCircle } from "lucide-react";

interface ActionBarProps {
  hasData?: boolean;
}

export function ActionBar({ hasData = true }: ActionBarProps) {
  const handleCreateTest = () => {
    console.log("Creating new test...");
    // Future: Add actual test creation logic
  };

  const handleGetHelp = () => {
    console.log("Opening help guide...");
    // Future: Add help navigation logic
  };

  if (!hasData) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8">
          <Button 
            onClick={handleCreateTest}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 md:px-10 md:py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base md:text-lg"
            aria-label="Create your first A/B test"
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4" />
            Create Your First Test
          </Button>
          
          <Button 
            onClick={handleGetHelp}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-6 py-4 md:px-8 md:py-5 rounded-xl transition-all duration-300 hover:scale-105 text-base md:text-lg"
          >
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            Get Started Guide
          </Button>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" aria-hidden="true"></div>
          <span className="text-sm md:text-base font-semibold text-blue-400">Ready to Begin</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
      <Button 
        onClick={handleCreateTest}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 md:px-10 md:py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base md:text-lg"
        aria-label="Create new A/B test"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4" />
        Create New Test
      </Button>
      
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" aria-hidden="true"></div>
        <span className="text-sm md:text-base font-semibold text-green-400">All Systems Operational</span>
      </div>
    </div>
  );
}
