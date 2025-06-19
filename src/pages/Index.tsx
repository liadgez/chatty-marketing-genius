
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
          <header className="h-14 sm:h-16 md:h-16 lg:h-20 glass-effect border-b border-white/10 flex items-center px-3 sm:px-4 sm:px-6 md:px-6 lg:px-8 backdrop-blur-xl">
            <SidebarTrigger className="mr-2 sm:mr-3 md:mr-3 lg:mr-6 text-white hover:bg-white/10 hover:text-blue-400 transition-colors p-2 rounded-lg" />
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                TerrificMarketingAI
              </h1>
              <span className="text-white/50 hidden sm:inline text-sm sm:text-lg">/</span>
              <span className="text-white/85 font-semibold hidden sm:inline truncate text-sm sm:text-base md:text-base lg:text-lg">{getSectionTitle()}</span>
            </div>

            {/* Stats Cluster - Hidden on mobile and small tablets */}
            <div className="hidden md:hidden lg:flex items-center space-x-4 lg:space-x-8">
              <div className="flex items-center space-x-4 lg:space-x-8 text-sm">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <span className="text-white font-semibold text-base lg:text-lg">24</span>
                  <span className="text-white/70 text-sm">Active Tests</span>
                </div>
                <div className="w-1 h-4 lg:h-6 bg-white/20 rounded"></div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <span className="text-white font-semibold text-base lg:text-lg">4.2×</span>
                  <span className="text-white/70 text-sm">Avg ROAS</span>
                </div>
                <div className="w-1 h-4 lg:h-6 bg-white/20 rounded"></div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-green-400 font-semibold text-sm">System Active</span>
                </div>
              </div>
              
              {/* Manual Refresh Button */}
              <button className="p-2 lg:p-3 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                <RefreshCw className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle />
              
              {/* Mobile Chat Toggle */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="text-white hover:bg-white/10 lg:hidden p-2 sm:p-3 rounded-xl"
                  aria-label="Toggle chat"
                >
                  {isChatOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
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
                ? `fixed inset-0 top-14 sm:top-16 md:top-16 lg:top-20 z-50 transition-transform duration-300 ${
                    isChatOpen ? 'translate-x-0' : 'translate-x-full'
                  }`
                : 'w-80 sm:w-96 md:w-80 lg:w-96 xl:w-[28rem] relative'
              }
              glass-effect border-l border-white/10 flex flex-col bg-white/5 backdrop-blur-xl shadow-2xl
            `}>
              {/* TerrificAI Branding at top of chat */}
              <div className="p-4 sm:p-6 md:p-6 lg:p-8 border-b border-white/10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-white truncate text-base sm:text-lg">TerrificAI</h2>
                    <p className="text-xs sm:text-sm text-white/70 truncate">Marketing Assistant</p>
                  </div>
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsChatOpen(false)}
                      className="text-white/65 hover:text-white hover:bg-white/10 shrink-0 p-1 sm:p-2 rounded-lg"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
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
