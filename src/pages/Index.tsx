
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
import { RefreshCw, FileSpreadsheet, MessageCircle, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Import new components we'll create
import { ABTestManagement } from "@/components/ABTestManagement";
import { ConversionsTracking } from "@/components/ConversionsTracking";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

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
          <header className="h-16 glass-effect border-b border-white/10 flex items-center px-3 md:px-6 backdrop-blur-xl">
            <SidebarTrigger className="mr-2 md:mr-4 text-white hover:bg-white/10 hover:text-blue-400 transition-colors" />
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                TerrificMarketingAI
              </h1>
              <span className="text-white/50 hidden sm:inline">/</span>
              <span className="text-white/85 font-medium hidden sm:inline truncate">{getSectionTitle()}</span>
            </div>

            {/* Stats Cluster - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
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
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              
              {/* Mobile Chat Toggle */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="text-white hover:bg-white/10 lg:hidden"
                  aria-label="Toggle chat"
                >
                  {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                </Button>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex relative">
            <div className={`flex-1 overflow-auto transition-all duration-300 ${
              isMobile && isChatOpen ? 'blur-sm pointer-events-none' : ''
            }`}>
              {renderActiveSection()}
            </div>
            
            {/* Chat Interface - Responsive behavior */}
            <div className={`
              ${isMobile 
                ? `fixed inset-0 top-16 z-50 transition-transform duration-300 ${
                    isChatOpen ? 'translate-x-0' : 'translate-x-full'
                  }`
                : 'w-96 relative'
              }
              glass-effect border-l border-white/10 flex flex-col bg-white/5 backdrop-blur-xl
            `}>
              {/* TerrificAI Branding at top of chat */}
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-white truncate">TerrificAI</h2>
                    <p className="text-xs text-white/65 truncate">Marketing Assistant</p>
                  </div>
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsChatOpen(false)}
                      className="text-white/65 hover:text-white hover:bg-white/10 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-h-0">
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
