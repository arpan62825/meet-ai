import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.session.user.id));

    return data;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        instructions: z
          .string()
          .min(1, { message: "Instructions is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await ctx.db
        .insert(agents)
        .values({
          name: input.name,
          instructions: input.instructions,
          userId: ctx.session.user.id,
        })
        .returning();

      return createdAgent;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Id is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [deletedAgent] = await ctx.db
        .delete(agents)
        .where(eq(agents.id, input.id))
        .returning();

      return deletedAgent;
    }),

  getByUserId: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Id is required" }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select()
        .from(agents)
        .where(eq(agents.userId, input.id));

      return data;
    }),
});
