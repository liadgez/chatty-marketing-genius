
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ActionBar() {
  return (
    <div className="flex items-center justify-between">
      <Button 
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create New Test
      </Button>
      
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-green-400">All Systems Operational</span>
      </div>
    </div>
  );
}
