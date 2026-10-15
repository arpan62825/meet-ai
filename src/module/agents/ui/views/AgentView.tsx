"use client";

import { agentColumns, type AgentTableMeta } from "../components/columns";
import { DataTable } from "../components/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { authClient } from "@/lib/auth-client";

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

  const meta: AgentTableMeta = {
    deleteAgent: (id: string) => deleteMutation.mutate({ id }),
    isDeleting: deleteMutation.isPending,
  };

  return (
    <div className="px-4 md:px-8">
      <DataTable
        columns={agentColumns}
        data={data ?? []}
        meta={meta}
        searchColumnId="name"
        searchPlaceholder="Search agents..."
      />
    </div>
  );
};

export default AgentsView;
