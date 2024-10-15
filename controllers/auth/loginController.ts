import type { Context } from "https://deno.land/x/oak@v17.1.0/context.ts";

const loginController = (ctx: Context) => {
  ctx.response.body = "Login";
}

export default loginController;