import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const getUserByToken = (ctx: Context) => {
  ctx.response.body = "User by token";
}

export default getUserByToken;