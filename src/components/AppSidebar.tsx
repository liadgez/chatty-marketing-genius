
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
  Users,
  Activity,
  FileText,
  GitBranch,
  Brain,
  TrendingUp,
  AlertTriangle,
  Settings,
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
          <SidebarGroupLabel className="text-muted-foreground font-semibold text-xs uppercase tracking-wider px-3 py-4">
            Marketing Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200 rounded-lg mx-2 group ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 font-medium border border-blue-500/20 shadow-lg shadow-blue-500/10"
                        : ""
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${activeSection === item.id ? 'text-blue-400' : ''}`} />
                    {state !== "collapsed" && (
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
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
          <SidebarGroupLabel className="text-muted-foreground font-semibold text-xs uppercase tracking-wider px-3 py-4">
            System Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-5 py-3 mx-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
