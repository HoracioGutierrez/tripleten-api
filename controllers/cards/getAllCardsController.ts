import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const getAllCardsController = (ctx: Context) => {
  ctx.response.body = "Cards";
}

export default getAllCardsController;