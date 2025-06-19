
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Dashboard } from "@/components/Dashboard";
import { TaskManagement } from "@/components/TaskManagement";
import { SwarmVisualization } from "@/components/SwarmVisualization";
import { AgentManagement } from "@/components/AgentManagement";
import { SystemMonitoring } from "@/components/SystemMonitoring";
import { GeneratedOutputs } from "@/components/GeneratedOutputs";
import { ChatInterface } from "@/components/ChatInterface";

// Import new components we'll create
import { ABTestManagement } from "@/components/ABTestManagement";
import { ConversionsTracking } from "@/components/ConversionsTracking";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "experiments":
        return <ABTestManagement />;
      case "conversions":
        return <ConversionsTracking />;
      case "tasks":
        return <TaskManagement />;
      case "swarm":
      case "pipeline":
        return <SwarmVisualization />;
      case "agents":
        return <AgentManagement />;
      case "monitoring":
        return <SystemMonitoring />;
      case "outputs":
      case "reports":
        return <GeneratedOutputs />;
      default:
        return <Dashboard />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "Dashboard";
      case "experiments":
        return "A/B Testing";
      case "conversions":
        return "Conversions";
      case "tasks":
        return "Task Management";
      case "swarm":
        return "Pipeline Workflow";
      case "agents":
        return "Agent Management";
      case "monitoring":
        return "Error Monitoring";
      case "outputs":
        return "Reports & Outputs";
      default:
        return "Dashboard";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-bg">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 glass-effect border-b border-white/10 flex items-center px-6 backdrop-blur-xl">
            <SidebarTrigger className="mr-4 text-foreground hover:bg-white/10 hover:text-blue-400 transition-colors" />
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TerrificMarketingAI
              </h1>
              <div className="text-sm text-muted-foreground">
                / {getSectionTitle()}
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">24 Active Tests</div>
                  <div className="text-xs text-muted-foreground">4.2x Avg ROAS</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-sm text-muted-foreground font-medium">System Active</span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex">
            <div className="flex-1 overflow-auto">
              {renderActiveSection()}
            </div>
            
            {/* Chat Interface - Always Visible */}
            <div className="w-96 glass-effect border-l border-white/10 flex flex-col">
              <ChatInterface />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
