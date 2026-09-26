"use client";
import DiceBearAvatar from "@/components/DiceBearAvatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { formatDistanceToNow } from "date-fns";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { TrashIcon } from "lucide-react";

const AgentsView = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const { data, isLoading, isError, refetch } = useQuery(
    trpc.agents.getByUserId.queryOptions({ id: session?.user.id as string }),
  );

  const deleteMutation = useMutation({
    ...trpc.agents.delete.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.agents.getByUserId.queryKey({
          id: session?.user.id as string,
        }),
      });
    },
  });

  if (isLoading) return <LoadingState title="Loading agents..." />;
  if (isError)
    return (
      <ErrorState
        title="Failed to load agents"
        description="We couldn't fetch your agents. Please try again."
        onRetry={() => refetch()}
      />
    );

  const agentsList = Array.isArray(data) ? data : data ? [data] : [];

  if (agentsList.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <p className="text-sm text-muted-foreground">
          No agents yet. Create one to get started!
        </p>
      </div>
    );

  return (
    <div className="flex flex-col px-4 md:px-8">
      {/* Table header — hidden on mobile */}
      <div className="hidden border-b py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-[1fr_2fr_auto_auto]  md:items-center md:gap-4">
        <span>Agent</span>
        <span>Instructions</span>
        <span>Created</span>
        <span className="w-10" />
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {agentsList.map((agent) => (
          <div
            key={agent.id}
            className="group flex items-start gap-3 border-b py-4 last:border-b-0 md:grid md:grid-cols-[1fr_2fr_auto_auto] md:items-center md:gap-4"
          >
            {/* Agent — avatar (mobile: row start) */}
            <div className="shrink-0 md:flex md:items-center md:gap-3">
              <DiceBearAvatar
                seed={agent.name}
                size={32}
                className="size-8 rounded-full"
              />

              {/* Name shown beside avatar on desktop only */}
              <span className="hidden text-sm font-semibold md:inline">
                {agent.name}
              </span>
            </div>

            {/* Instructions — row middle */}
            <div className="flex min-w-0 flex-1 flex-col gap-1 md:contents">
              <span className="text-sm font-semibold md:hidden">
                {agent.name}
              </span>

              {/* Instructions — truncated */}
              <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                {agent.instructions}
              </p>

              {/* Created date */}
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(agent.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            {/* Delete — pushed to the right on mobile */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 self-center text-destructive hover:text-destructive/80"
              onClick={() => deleteMutation.mutate({ id: agent.id })}
              disabled={deleteMutation.isPending}
            >
              <TrashIcon className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsView;
