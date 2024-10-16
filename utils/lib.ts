import type { BadRequestParams, FormatResponseParams } from "./types/types.ts";

export const formatResponse = ({ context, message, status }: FormatResponseParams) => {

  context.response.status = 200;
  context.response.body = "OK";

  if (status) {
    context.response.status = status;
  }

  if (message) {
    context.response.body = message;
  }

  return context;
}

export const badRequest = ({ context, message }: BadRequestParams) => {
  return formatResponse({
    context,
    message,
    status: 400
  });
}

export const serverError = ({ context, message }: BadRequestParams) => {
  return formatResponse({
    context,
    message,
    status: 500
  });
}