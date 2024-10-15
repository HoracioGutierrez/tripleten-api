import { Router } from "https://deno.land/x/oak/mod.ts";
import getAllUsers from "../controllers/users/getAllUsers.ts";
import getUserById from "../controllers/users/getUserById.ts";

const userRouter = new Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

export default userRouter;