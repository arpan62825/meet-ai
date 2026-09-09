import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/module/dashboard/ui/components/dashboard-sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen">{children}</main>
    </SidebarProvider>
  );
};

export default layout;
