
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
  { id: "dashboard", title: "Dashboard", icon: BarChart3 },
  { id: "experiments", title: "A/B Testing", icon: Target },
  { id: "conversions", title: "Conversions", icon: TrendingUp },
  { id: "swarm", title: "Pipeline Workflow", icon: GitBranch },
  { id: "agents", title: "Agent Management", icon: Brain },
  { id: "monitoring", title: "Error Monitoring", icon: AlertTriangle },
  { id: "outputs", title: "Reports", icon: FileText },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-white/10 glass-effect">
      <SidebarContent>
        <SidebarGroup className="px-4 pt-8 pb-0">
          <SidebarGroupLabel className="text-white/75 font-semibold text-xs uppercase tracking-wider mb-4">
            Marketing Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full h-10 px-4 rounded-lg transition-colors duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white font-semibold border-l-2 border-teal-400"
                        : "text-white/65 hover:text-white hover:bg-white/5 border-l-2 border-transparent font-medium"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${
                      activeSection === item.id ? 'text-teal-400' : 'text-white/65'
                    }`} />
                    
                    {state !== "collapsed" && (
                      <span className="ml-3 text-sm truncate">
                        {item.title}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4 pt-8 pb-4">
          <SidebarGroupLabel className="text-white/75 font-semibold text-xs uppercase tracking-wider mb-4">
            System Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-400 ml-3">All Systems Active</span>
              </div>
              <div className="text-xs text-green-400/70 mt-1 ml-5">24 experiments running</div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
