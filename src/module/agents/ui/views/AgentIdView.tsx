import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

interface Props {
  params: Promise<{
    agentId: string;
  }>;
}

const AgentIdView = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();

  

  return <div>AgentIdView</div>;
};

export default AgentIdView;
