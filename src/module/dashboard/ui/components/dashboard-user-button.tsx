"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { FaRegUser } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiNotificationBold } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaEllipsisVertical } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DashboardUserButton = ({
  user,
}: {
  user: { name: string; email: string; avatar: string };
}) => {
  const isMobile = useIsMobile();

  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
        },
      },
    });
  };

  const userInfo = (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </div>
  );

  const menuItems = (
    <>
      <button
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
        onClick={() => {}}
      >
        <FaRegUser />
        Account
      </button>
      <button
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
        onClick={() => {}}
      >
        <FaRegCreditCard />
        Billing
      </button>
      <button
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
        onClick={() => {}}
      >
        <PiNotificationBold />
        Notifications
      </button>
    </>
  );

  const triggerButton = (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
      <FaEllipsisVertical className="text-muted-foreground" />
    </SidebarMenuButton>
  );

  if (isMobile) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Drawer showSwipeHandle>
            <DrawerTrigger render={triggerButton} />
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{user.name}</DrawerTitle>
                <DrawerDescription>{user.email}</DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-1 px-4 py-2">{menuItems}</div>
              <Separator />
              <DrawerFooter>
                <Button variant="outline" onClick={handleSignOut}>
                  <IoLogOutOutline className="size-5" />
                  Log out
                </Button>
                <DrawerClose render={<Button variant="ghost" />}>
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={triggerButton} />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                {userInfo}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FaRegUser />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaRegCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PiNotificationBold />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <IoLogOutOutline className="size-5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default DashboardUserButton;
