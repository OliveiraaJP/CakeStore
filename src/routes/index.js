import { Router } from "express";
import cakesRouter from "./cakesRouter/index.js";
import clientsRouter from "./clientsRouter/index.js";
import ordersRouter from "./ordersRouter/index.js";

const router = Router()

router.use(cakesRouter)
router.use(clientsRouter)
router.use(ordersRouter)

export default router;
