import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { blogRouter } from "./blogRouter";
import { quizRouter } from "./quizRouter";
import { leadsRouter } from "./leadsRouter";
import { waitlistRouter } from "./waitlistRouter";
import { analyticsRouter } from "./analyticsRouter";
import { mediaRouter } from "./mediaRouter";
import { pagesRouter } from "./pagesRouter";
import { redirectsRouter } from "./redirectsRouter";
import { notFoundRouter } from "./notFoundRouter";
import { governanceRouter } from "./governanceRouter";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blog: blogRouter,
  quiz: quizRouter,
  leads: leadsRouter,
  waitlist: waitlistRouter,
  analytics: analyticsRouter,
  media: mediaRouter,
  pages: pagesRouter,
  redirects: redirectsRouter,
  notFound: notFoundRouter,
  governance: governanceRouter,
});

export type AppRouter = typeof appRouter;
