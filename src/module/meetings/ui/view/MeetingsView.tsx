"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MeetingHeader from "../components/MeetingHeader";
import { authClient } from "@/lib/auth-client";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { DataTable } from "../components/data-table";
import { meetingColumns, MeetingTableMeta } from "../components/columns";

const MeetingsView = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const { data, isLoading, isError, refetch } = useQuery(
    trpc.meetings.getMany.queryOptions(),
  );

  const deleteMutation = useMutation({
    ...trpc.meetings.delete.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.meetings.getByUserId.queryKey({
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

  const meta: MeetingTableMeta = {
    deleteMeeting: (id: string) => deleteMutation.mutate({ id }),
    isDeleting: deleteMutation.isPending,
  };

  return (
    <div>
      <div className="flex flex-1 flex-col min-h-0 px-4 md:px-8 pb-4">
        <MeetingHeader />
        <DataTable
          columns={meetingColumns}
          data={data ?? []}
          meta={meta}
          searchColumnId="name"
          searchPlaceholder="Search agents..."
        />
      </div>
    </div>
  );
};
export default MeetingsView;
