import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const getAllUsers = (ctx: Context) => {
  ctx.response.body = "Users";
}

export default getAllUsers;