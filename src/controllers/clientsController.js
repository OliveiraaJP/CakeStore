import dayjs from "dayjs";
import clientsRepository from "../repositories/clientsRepository.js";
import orderRepository from "../repositories/orderRepository.js";

export const postClient = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    await clientsRepository.addClient(name, address, phone);
    res.status(201).send("Registered client!");
  } catch (error) {
    console.log("post client trc error: ", error);
    res.sendStatus(500);
  }
};

export const getClientOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const hasUser = orderRepository.verifyClient(id);
    if (hasUser.rowCount === 0)
      return res.send("User not found ;-;").status(404);
    const allOrders = await clientsRepository.getAllClientOrders(id);
    console.log(allOrders.rows);
    res.send(allOrders.rows.map(_mapUserOrdersObject)).status(200);

  } catch (error) {
    console.log("trc getclientsorder error: ", error);
    res.sendStatus(500);
  }
};

function _mapUserOrdersObject(row) {
  const [orderId, quantity, createdAt, cakeName, cakePrice] = row;

    const newDate = dayjs(createdAt).format('YYYY-MM-DD HH:mm')
    const price = cakePrice*1
    const newPrice = parseInt(quantity) * price.toFixed(2)

  return{
    orderId,
    quantity,
    createdAt: newDate,
    totalPrice: newPrice.toFixed(2),
    cakeName
  }
}
