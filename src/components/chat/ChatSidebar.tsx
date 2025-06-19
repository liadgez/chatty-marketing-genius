import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { FileSpreadsheet, BarChart3, Lightbulb, Target } from "lucide-react";

export function ChatSidebar() {
  const quickActions = [
    { icon: BarChart3, label: "Analyze Data", description: "Deep dive into your metrics" },
    { icon: Lightbulb, label: "Get Ideas", description: "Creative brainstorming session" },
    { icon: Target, label: "Plan Strategy", description: "Strategic recommendations" },
  ];

  return (
    <Sidebar className="w-64 glass-effect border-r border-white/10">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white">TerrificAI</h2>
            <p className="text-xs text-white/65">Marketing Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/75 mb-3">Quick Actions</h3>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 glass-effect hover:bg-white/10 text-left"
              >
                <Icon className="w-4 h-4 mr-3 text-blue-400" />
                <div>
                  <div className="text-sm font-medium text-white">{action.label}</div>
                  <div className="text-xs text-white/65">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
