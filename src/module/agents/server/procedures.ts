import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.session.user.id));

    return data;
  }),
});
