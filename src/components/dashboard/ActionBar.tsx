
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
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button 
            onClick={handleCreateTest}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            aria-label="Create your first A/B test"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Test
          </Button>
          
          <Button 
            onClick={handleGetHelp}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Get Started Guide
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" aria-hidden="true"></div>
          <span className="text-sm font-medium text-blue-400">Ready to Begin</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Button 
        onClick={handleCreateTest}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        aria-label="Create new A/B test"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create New Test
      </Button>
      
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
        <span className="text-sm font-medium text-green-400">All Systems Operational</span>
      </div>
    </div>
  );
}
