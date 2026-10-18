"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import AgentCard from "../components/AgentCard";
import LoadingState from "@/components/LoadingState";

interface Props {
  agentId: string;
}

const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const { data, isLoading, isError, refetch } = useQuery(
    trpc.agents.getById.queryOptions({ id: agentId }),
  );

  if (isLoading || !data) {
    return <LoadingState />;
  }

  return (
    <div className="flex justify-center p-4 md:p-8 w-full">
      <AgentCard agent={data} />
    </div>
  );
};

export default AgentIdView;
