import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/module/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar from "@/module/dashboard/ui/components/dashboard-navbar";
import AgentHeader from "@/module/agents/ui/views/AgentHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <DashboardNavbar>
        <AgentHeader />
        {children}
      </DashboardNavbar>
    </SidebarProvider>
  );
};

export default layout;
