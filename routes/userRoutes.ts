import { Router } from "https://deno.land/x/oak/mod.ts";
import getAllUsers from "../controllers/users/getAllUsers.ts";
import getUserById from "../controllers/users/getUserById.ts";
import getUserByToken from "../controllers/users/getUserByToken.ts";

const userRouter = new Router();

userRouter.get("/", getAllUsers);

userRouter.get("/me", getUserByToken);

userRouter.get("/:id", getUserById);


export default userRouter;