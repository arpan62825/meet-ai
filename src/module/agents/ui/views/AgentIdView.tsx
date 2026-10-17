"use client";

import DiceBearAvatar from "@/components/DiceBearAvatar";
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
    <div className="flex justify-center mt-16  h-7/12">
      <AgentCard agent={data} />
    </div>
  );
};

export default AgentIdView;
