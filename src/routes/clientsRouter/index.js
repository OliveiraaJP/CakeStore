import { Router } from "express";
import { getClientOrders, postClient } from "../../controllers/clientsController.js";
import { schemaValidator } from "../../middlewares/schemaValidator.js";
import clietsSchema from "../../schemas/clientsSchema.js";


const clientsRouter = Router()

clientsRouter.post('/clients', schemaValidator(clietsSchema), postClient)
clientsRouter.get('/clients/:id/orders', getClientOrders)

export default clientsRouter;