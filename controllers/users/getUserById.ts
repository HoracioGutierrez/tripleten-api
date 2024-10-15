import type { RouterContext } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const getUserById = (ctx: RouterContext<"/:id">) => {
  ctx.response.body = `User ${ctx.params.id}`;
}

export default getUserById;