
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
import { MessageCircle, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
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
          <header className="shrink-0 h-16 glass-effect border-b border-white/10 flex items-center px-8">
            <SidebarTrigger className="mr-6 text-white hover:bg-white/10 p-2 rounded-lg" />
            
            <div className="flex items-center space-x-4 flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TerrificMarketingAI
              </h1>
              <span className="text-white/50">/</span>
              <span className="text-white/85 font-semibold">{getSectionTitle()}</span>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="text-white hover:bg-white/10 lg:hidden"
                >
                  {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                </Button>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex relative min-h-0">
            <div className={`flex-1 overflow-auto ${
              isMobile && isChatOpen ? 'blur-sm pointer-events-none' : ''
            }`}>
              {renderActiveSection()}
            </div>
            
            {/* Chat Interface */}
            <div className={`
              ${isMobile 
                ? `fixed inset-0 top-16 z-50 transition-transform duration-300 ${
                    isChatOpen ? 'translate-x-0' : 'translate-x-full'
                  }`
                : 'w-96 relative shrink-0'
              }
              glass-effect border-l border-white/10 flex flex-col bg-white/5
            `}>
              {/* Chat Header */}
              <div className="shrink-0 p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-white">TerrificAI</h2>
                    <p className="text-sm text-white/70">Marketing Assistant</p>
                  </div>
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsChatOpen(false)}
                      className="text-white/65 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
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
