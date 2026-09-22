"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResponsiveDialogue from "@/components/ResponsiveDialogue";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError, refetch } = useQuery(
    trpc.agents.getMany.queryOptions(),
  );

  if (isLoading) return <LoadingState title="Loading agents..." />;
  if (isError)
    return (
      <ErrorState
        title="Failed to load agents"
        description="We couldn't fetch your agents. Please try again."
        onRetry={() => refetch()}
      />
    );

  return (
    <div>
      <ResponsiveDialogue
        title="This title"
        description="this description"
        open
        onOpenChange={() => {}}
      >
        <div>This should be the children</div>
      </ResponsiveDialogue>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default AgentsView;
