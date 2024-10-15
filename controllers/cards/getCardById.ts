import type { RouterContext } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const getCardById = (ctx: RouterContext<"/:id">) => {
  ctx.response.body = `Card ${ctx.params.id}`;
}

export default getCardById;