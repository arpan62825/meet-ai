"use client";

import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ResponsiveCommandDialog } from "@/components/ui/command";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

import { FaPlus } from "react-icons/fa6";
import AgentListCombobox from "./AgentListCombobox";

const MeetingHeader = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const createMutation = useMutation({
    ...trpc.agents.create.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.agents.getByUserId.queryKey({
          id: session?.user.id as string,
        }),
      });
    },
  });

  const handleSubmit = async (formData: FormData) => {
    createMutation.mutate({
      name: formData.get("name") as string,
      instructions: formData.get("instructions") as string,
    });
    console.log(formData.get("name"));
    console.log(formData.get("instructions"));
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="shrink-0 flex flex-col px-4 pt-4 pb-2 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meet.AI Meetings</h1>
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FaPlus />
          Add Meeting
        </Button>
      </div>
      <ResponsiveCommandDialog
        title="Create Agent"
        description="Fill in the details to create a new agent."
        open={open}
        onOpenChange={setOpen}
      >
        <Form action={handleSubmit} className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name the meeting</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. Top secret meeting"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="agent">Select Agent</Label>
            <AgentListCombobox />
          </div>
          <Button type="submit" className="w-full">
            Create Meeting
          </Button>
        </Form>
      </ResponsiveCommandDialog>
    </div>
  );
};

export default MeetingHeader;
