import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";

export const notFoundRoute = (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = "Not Found";
};