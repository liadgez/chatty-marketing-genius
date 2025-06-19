
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

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return <TaskManagement />;
      case "swarm":
        return <SwarmVisualization />;
      case "agents":
        return <AgentManagement />;
      case "monitoring":
        return <SystemMonitoring />;
      case "outputs":
        return <GeneratedOutputs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-card border-b border-border flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-bold text-foreground">TerrificMarketingAI</h1>
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">System Active</span>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex">
            <div className="flex-1 p-6">
              {renderActiveSection()}
            </div>
            
            {/* Chat Interface - Always Visible */}
            <div className="w-96 border-l border-border bg-card">
              <ChatInterface />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
