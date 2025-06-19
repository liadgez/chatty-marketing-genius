
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
  Settings,
  Users,
  Activity,
  FileText,
  GitBranch,
  Brain,
} from "lucide-react";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BarChart3 },
  { id: "tasks", title: "Task Management", icon: Settings },
  { id: "swarm", title: "Swarm Visualization", icon: GitBranch },
  { id: "agents", title: "Agent Management", icon: Brain },
  { id: "monitoring", title: "System Monitoring", icon: Activity },
  { id: "outputs", title: "Generated Outputs", icon: FileText },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-white/10 bg-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider px-3 py-4">
            Analytics Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 hover-glow rounded-lg mx-2 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/25"
                        : ""
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
