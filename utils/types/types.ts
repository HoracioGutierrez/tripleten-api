import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";

export interface User {
  email: string;
  password: string;
  name?: string;
}

export type SignUpRequestBody = User;

export type LoginRequestBody = User;

export type FormatResponseParams = {
  context: Context;
  status?: number;
  message?: string;
}

export type BadRequestParams = {
  context: Context;
  message: string;
}

export type NewDBUser = Required<User> & {
  id: string;
}