"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, MoreVertical, Pencil, Trash, Video } from "lucide-react";
import DiceBearAvatar from "@/components/DiceBearAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTRPC } from "@/trpc/client";

interface Agent {
  id: string;
  name: string;
  userId: string;
  instructions: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    ...trpc.agents.delete.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.agents.getByUserId.queryKey({
          id: agent.userId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: trpc.agents.getMany.queryKey(),
      });
      router.push("/agents");
    },
  });

  return (
    <div className="w-full max-w-4xl rounded-xl border bg-card p-6 md:p-8 shadow-xs flex flex-col gap-6">
      {/* Top Header: Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/agents"
            className="hover:text-foreground transition-colors font-medium"
          >
            My Agents
          </Link>
          <ChevronRight className="size-4 text-muted-foreground/60" />
          <span className="font-semibold text-foreground">{agent.name}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
              >
                <MoreVertical className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-36 rounded-lg">
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => deleteMutation.mutate({ id: agent.id })}
              disabled={deleteMutation.isPending}
            >
              <Trash className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Agent Avatar and Name */}
      <div className="flex items-center gap-3.5">
        <DiceBearAvatar
          seed={agent.name}
          size={44}
          className="size-11 rounded-full border border-border/40"
        />
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {agent.name}
        </h2>
      </div>

      {/* Meetings Badge */}
      <div className="flex items-center gap-2 w-fit rounded-md border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
        <Video className="size-3.5 text-muted-foreground" />
        <span>0 meetings</span>
      </div>

      {/* Instructions Section */}
      <div className="flex flex-col gap-2 pt-2">
        <h3 className="text-sm font-semibold text-foreground">Instructions</h3>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {agent.instructions}
        </p>
      </div>
    </div>
  );
};

export default AgentCard;
