import { handler } from "./src/server.ts";

const serverConfig = {
  port: 3000,
}

Deno.serve(serverConfig, handler)