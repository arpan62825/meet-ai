import { createTRPCRouter } from "@/trpc/init";
import { agentsRouter } from "@/module/agents/server/procedures";
import { meetingsRouter } from "@/module/meetings/server/procedures";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});

export type AppRouter = typeof appRouter;
