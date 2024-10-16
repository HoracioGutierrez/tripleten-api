import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

import validator from "npm:validator"

import type { NewDBUser, SignUpRequestBody } from "../../utils/types/types.ts";
import { badRequest, serverError } from "../../utils/lib.ts";


const signUpController = async (ctx: Context) => {
  let requestBody: SignUpRequestBody;

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

    const userExists = await db.get(["users", requestBody.email])

    if (userExists.value) {
      return serverError({ context: ctx, message: "User already exists" });
    }

    const generatedSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(requestBody.password, generatedSalt);

    const newUser: NewDBUser = {
      email: requestBody.email,
      password: hashedPassword,
      id: crypto.randomUUID(),
      name : requestBody.name || "Jaques Cousteau"
    }

    await db.set(["users", requestBody.email], newUser);

    ctx.response.status = 201;
    ctx.response.body = newUser;
  } catch (err) {
    if (err instanceof Error) {
      return serverError({ context: ctx, message: err.message });
    } else {
      return serverError({ context: ctx, message: "Unknown error occurred while creating user. Please try again later" });
    }
  }
}

export default signUpController;