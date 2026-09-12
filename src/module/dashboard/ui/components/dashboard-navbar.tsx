"use client";
import { FaSearch } from "react-icons/fa";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

export default function DashboardNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openCommandPanel = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1 text-2xl" />
        <Button
          id="command-button"
          className={
            "bg-zinc-200 border-none text-black min-w-64 flex justify-between"
          }
          onClick={() => openCommandPanel()}
        >
          <span className="flex items-center gap-3">
            <FaSearch />
            Search
          </span>
          <span className="text-sm">⌘K</span>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            {/* <CommandShortcut>⌘K</CommandShortcut> */}
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </header>
      {children}
    </SidebarInset>
  );
}
