
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { FileSpreadsheet } from "lucide-react";

export function ChatSidebar() {
  return (
    <Sidebar className="w-64 glass-effect border-r border-white/10">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white">TerrificAI</h2>
            <p className="text-xs text-white/65">Marketing Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        {/* Completely empty content area */}
      </SidebarContent>
    </Sidebar>
  );
}
