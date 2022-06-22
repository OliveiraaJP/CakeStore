import { Router } from "express";
import { postCake } from "../../controllers/cakesController.js";
import { imageValidator } from "../../middlewares/imageValidator.js";
import { schemaValidator } from "../../middlewares/schemaValidator.js";
import cakeSchema from "../../schemas/cakeSchema.js";
import imageSchema from "../../schemas/imageSchema.js"

const cakesRouter = Router()

cakesRouter.post('/cakes',schemaValidator(cakeSchema), imageValidator(imageSchema),postCake)

export default cakesRouter;