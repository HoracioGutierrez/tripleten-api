import type { Context } from "https://deno.land/x/oak@v17.1.0/context.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { create } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

import validator from "npm:validator"
import type { LoginRequestBody } from "../../utils/types/types.ts";
import { badRequest, serverError } from "../../utils/lib.ts";


const loginController = async (ctx: Context) => {
  let requestBody: LoginRequestBody;

  try {
    requestBody = await ctx.request.body.json();
  } catch (_err) {
    return badRequest({ context: ctx, message: "Invalid request body. Malformed JSON" });
  }

  if (!requestBody.email || !requestBody.password) {
    return badRequest({ context: ctx, message: "Invalid request body, email and password are required" });
  }

  if (!validator.isEmail(requestBody.email)) {
    return badRequest({ context: ctx, message: "Invalid email format" });
  }

  if (!validator.isLength(requestBody.password, { min: 6, max: 30 })) {
    return badRequest({ context: ctx, message: "Password must be between 6 and 30 characters" });
  }

  try {
    const db = await Deno.openKv("https://api.deno.com/databases/d506fcca-3eee-4678-9b7f-d51059fac625/connect");

    const userExists: Deno.KvEntryMaybe<{ password: string, email: string }> = await db.get(["users", requestBody.email])

    if (!userExists.value) {
      return serverError({ context: ctx, message: "User does not exists" });
    }

    const isSamePassword = await bcrypt.compare(requestBody.password, userExists.value.password)

    if (!isSamePassword) {
      return serverError({ context: ctx, message: "Invalid password" });
    }

    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );

    const jwt = await create({
      alg: "HS512",
      typ: "JWT"
    }, {
      email: userExists.value.email
    }, key);

    ctx.response.status = 200;
    ctx.response.body = { jwt };

  } catch (err) {
    if (err instanceof Error) {
      return serverError({ context: ctx, message: err.message });
    } else {
      return serverError({ context: ctx, message: "Unknown error occurred while creating user. Please try again later" });
    }
  }
}

export default loginController;