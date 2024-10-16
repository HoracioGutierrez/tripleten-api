import { Router } from "https://deno.land/x/oak/mod.ts";
import loginController from "../controllers/auth/loginController.ts";
import signUpController from "../controllers/auth/signUpController.ts";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants.ts";

const authRouter = new Router();

authRouter.post(SIGNIN_ROUTE, loginController);

authRouter.post(SIGNUP_ROUTE, signUpController);

export default authRouter;