
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
import { RefreshCw, FileSpreadsheet } from "lucide-react";

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
          {/* Enhanced Header with breadcrumbs and stats */}
          <header className="h-16 glass-effect border-b border-white/10 flex items-center px-6 backdrop-blur-xl">
            <SidebarTrigger className="mr-4 text-white hover:bg-white/10 hover:text-blue-400 transition-colors" />
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TerrificMarketingAI
              </h1>
              <span className="text-white/50">/</span>
              <span className="text-white/85 font-medium">{getSectionTitle()}</span>
            </div>

            {/* Stats Cluster */}
            <div className="ml-auto flex items-center space-x-6">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">24</span>
                  <span className="text-white/65">Active Tests</span>
                </div>
                <div className="w-1 h-4 bg-white/20 rounded"></div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">4.2×</span>
                  <span className="text-white/65">Avg ROAS</span>
                </div>
                <div className="w-1 h-4 bg-white/20 rounded"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-green-400 font-medium">System Active</span>
                </div>
              </div>
              
              {/* Manual Refresh Button */}
              <button className="p-2 rounded-lg text-white/65 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              
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
              {/* TerrificAI Branding at top of chat */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">TerrificAI</h2>
                    <p className="text-xs text-white/65">Marketing Assistant</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <ChatInterface />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
