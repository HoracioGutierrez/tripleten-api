import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./routes/userRoutes.ts";
import cardRouter from "./routes/cardRoutes.ts";
import { notFoundRoute } from "./routes/notFoundRoute.ts";
import authRouter from "./routes/authRoutes.ts";
import { API_AUTH_ROUTE, API_CARDS_ROUTE, API_USERS_ROUTE } from "./utils/constants.ts";
import landingController from "./controllers/landingController.ts";

const serverConfig = {
  port: 3000,
}

const app = new Application();
const router = new Router();

//Home Route
router.get("/", landingController);

//User Routes
router.use(API_USERS_ROUTE, userRouter.routes());
//Card Routes
router.use(API_CARDS_ROUTE, cardRouter.routes());
//Auth Routes
router.use(API_AUTH_ROUTE, authRouter.routes());

//404 Not Found Route
router.use("/(.*)", notFoundRoute);

//Allowed Routes
app.use(router.routes());

await app.listen(serverConfig)