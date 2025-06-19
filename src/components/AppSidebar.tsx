
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
  MessageSquare,
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
    <Sidebar className="border-r border-slate-200 bg-slate-900">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-semibold">
            Analytics Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-600 text-white font-medium"
                        : ""
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {state !== "collapsed" && <span>{item.title}</span>}
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
