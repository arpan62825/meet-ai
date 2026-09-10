"use client";

import { FiVideo } from "react-icons/fi";
import { LuBot } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
  {
    icon: FiVideo,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: LuBot,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: FaRegStar,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const user = {
  name: "John Doe",
  email: "john@doe.com",
  avatar:
    "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
};

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2 py-4"
        >
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-extrabold text-black">Meet.AI</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="text-lg">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Dashboard</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link
                    className="text-lg flex items-center gap-2 px-3"
                    href={item.href}
                  >
                    {item.icon && <item.icon className="mr-2 size-4" />}
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Upgrade</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link
                    className="text-lg flex items-center gap-2 px-3"
                    href={item.href}
                  >
                    {item.icon && <item.icon className="mr-2 size-4" />}
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserButton user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
