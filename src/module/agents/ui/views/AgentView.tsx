"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

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

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default AgentsView;
