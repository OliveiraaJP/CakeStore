import { Router } from "express";
import { postClient } from "../../controllers/clientsController.js";
import { schemaValidator } from "../../middlewares/schemaValidator.js";
import clietsSchema from "../../schemas/clientsSchema.js";


const clientsRouter = Router()

clientsRouter.post('/clients', schemaValidator(clietsSchema), postClient)
clientsRouter.get('/clients/:id/orders')

export default clientsRouter;