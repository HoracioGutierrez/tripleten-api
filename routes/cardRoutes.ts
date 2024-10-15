import { Router } from "https://deno.land/x/oak/mod.ts";
import getAllCardsController from "../controllers/cards/getAllCardsController.ts";
import getCardById from "../controllers/cards/getCardById.ts";

const cardRouter = new Router();

cardRouter.get("/", getAllCardsController);

cardRouter.get("/:id", getCardById);

export default cardRouter;