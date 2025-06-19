
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,  
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Target,
  TrendingUp,
  GitBranch,
  Brain,
  AlertTriangle,
  FileText,
} from "lucide-react";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BarChart3, description: "Overview & Analytics" },
  { id: "experiments", title: "A/B Testing", icon: Target, description: "Manage Experiments" },
  { id: "conversions", title: "Conversions", icon: TrendingUp, description: "Track Performance" },
  { id: "swarm", title: "Pipeline Workflow", icon: GitBranch, description: "Data Processing" },
  { id: "agents", title: "Agent Management", icon: Brain, description: "Configure Agents" },
  { id: "monitoring", title: "Error Monitoring", icon: AlertTriangle, description: "System Health" },
  { id: "outputs", title: "Reports", icon: FileText, description: "Generated Insights" },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-white/10 glass-effect">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/75 font-semibold text-xs uppercase tracking-wider px-3 py-4">
            Marketing Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start transition-all duration-200 rounded-lg mx-2 group relative overflow-hidden ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white font-medium border-l-3 border-teal-400 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30"
                        : "text-white/65 hover:text-white hover:bg-white/5 border-l-3 border-transparent"
                    }`}
                  >
                    {/* Glow effect for active item */}
                    {activeSection === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-400/10 animate-pulse" />
                    )}
                    
                    <item.icon className={`mr-3 h-5 w-5 relative z-10 ${
                      activeSection === item.id ? 'text-teal-400' : 'text-white/65 group-hover:text-white'
                    }`} />
                    
                    {state !== "collapsed" && (
                      <div className="flex flex-col items-start relative z-10">
                        <span className={`font-medium ${
                          activeSection === item.id ? 'text-white' : 'group-hover:text-white'
                        }`}>
                          {item.title}
                        </span>
                        <span className={`text-xs transition-colors ${
                          activeSection === item.id 
                            ? 'text-white/75' 
                            : 'text-white/45 group-hover:text-white/65'
                        }`}>
                          {item.description}
                        </span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-white/75 font-semibold text-xs uppercase tracking-wider px-3 py-4">
            System Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-5 py-3 mx-2 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm text-green-400 font-medium">All Systems Active</span>
              </div>
              <div className="text-xs text-green-400/70 mt-1">24 experiments running</div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
