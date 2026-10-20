import { meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const meetingsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(meetings)
      .where(eq(meetings.userId, ctx.session.user.id));

    return data;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1, { message: "Id is required" }) }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(meetings)
        .where(eq(meetings.id, input.id));

      return data;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        agentId: z.string().min(1, { message: "AgentId is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [createdMeetings] = await ctx.db
        .insert(meetings)
        .values({
          name: input.name,
          userId: ctx.session.user.id,
          agentId: input.agentId,
        })
        .returning();

      return createdMeetings;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Id is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [deletedAgent] = await ctx.db
        .delete(meetings)
        .where(eq(meetings.id, input.id))
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
        .from(meetings)
        .where(eq(meetings.userId, input.id));

      return data;
    }),
});
