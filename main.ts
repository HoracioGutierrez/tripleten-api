import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const serverConfig = {
  port: 3000,
}

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello World!";
});

router.get("/hello/:name", (ctx) => {
  ctx.response.body = `Hello ${ctx.params.name}!`;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(serverConfig)