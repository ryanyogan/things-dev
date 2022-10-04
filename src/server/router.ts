import * as trpc from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";

export const serverRouter = trpc
  .router<Context>()
  .query("findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.thing.findMany();
    },
  })
  .mutation("insertOne", {
    input: z.object({
      title: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.thing.create({
        data: { title: input.title },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      id: z.number(),
      title: z.string(),
      checked: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.thing.update({
        where: { id },
        data: { ...rest },
      });
    },
  })
  .mutation("deleteAll", {
    input: z.object({
      ids: z.number().array(),
    }),
    resolve: async ({ input, ctx }) => {
      const { ids } = input;

      return await ctx.prisma.thing.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    },
  });

export type ServerRouter = typeof serverRouter;
