import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import type { SignUpRequestBody } from "../../utils/types/types.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import validator from "npm:validator"
import { badRequest } from "../../utils/lib.ts";

const signUpController = async (ctx: Context) => {
  let requestBody: SignUpRequestBody;

  // Validate request body as JSON format
  try {
    requestBody = await ctx.request.body.json();
  } catch (_err) {
    badRequest({ context: ctx, message: "Invalid request body. Malformed JSON" });
    return;
  }

  // Validate request body email and password 
  if (!requestBody.email || !requestBody.password) {
    badRequest({ context: ctx, message: "Invalid request body, email and password are required" });
    return;
  }

  // Validate email format 
  if (!validator.isEmail(requestBody.email)) {
    badRequest({ context: ctx, message: "Invalid email format" });
    return;
  }

  // Validate password length
  if (!validator.isLength(requestBody.password, { min: 6, max: 30 })) {
    badRequest({ context: ctx, message: "Password must be between 6 and 30 characters" });
    return;
  }

  // Hash password
  const generatedSalt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(requestBody.password, generatedSalt);

  ctx.response.body = hashedPassword;
}

export default signUpController;