import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

interface Props {
  params: Promise<{
    agentId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <trpc.Provider queryClient={queryClient}>
          <AgentIdView agentId={agentId} />
        </trpc.Provider> */}
      </Suspense>
    </ErrorBoundary>
  );
};
