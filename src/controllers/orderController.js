import orderRepository from "../repositories/orderRepository.js";
import dayjs from "dayjs";

export const postOrder = async (req, res) => {
  const { clientId, cakeId, quantity } = req.body;

  try {
    const hasClient = await orderRepository.verifyClient(clientId);
    const hasCake = await orderRepository.verifyCake(cakeId);
    if (hasCake.rowCount === 0)
      return res.status(404).send("Non-existent cake");
    if (hasClient.rowCount === 0)
      return res.status(404).send("Non-existent client");

    await orderRepository.addOrder(clientId, cakeId, quantity);
    res.status(201).send("Cake(s) ordered!");
  } catch (error) {
    console.log("post order trc error: ", error);
    res.sendStatus(500);
  }
};

export const getAllOrders = async (req, res) => {
  const { date } = req.query
  try {
    const params = []
    let whereClause = ''

    if(date){
      params.push(`${date}%`)
      whereClause += `WHERE o."createdAt" ILIKE $${params.length}`; //case insensitive
    }

    const orders = await orderRepository.getOrders(whereClause, params);
    console.log(orders.rows.map(_mapOrderObject));
    if (orders.rowCount === 0 ) return res.status(404).send('no orders yet ;-; ')

    res.send(orders.rows.map(_mapOrderObject)).status(200);
  } catch (error) {
    console.log("get all order trc error: ", error);
    res.sendStatus(500);
  }
};

export const getSingleOrder = async (req, res) => {
  const {id} = req.params

  try {
    const hasOrder = await orderRepository.verifyOrder(id);
    if(hasOrder.rowCount ===0) return res.send('No order with this Id').status(404);
    const singleOrder = await orderRepository.getOneOrder(id)
    console.log(singleOrder.rows.map(_mapOrderObject));
    res.send(singleOrder.rows.map(_mapOrderObject)).status(200)

  } catch (error) {
    console.log('error single order trc: ', error);
    res.sendStatus(500);
  }
}

function _mapOrderObject(row) {
  const [
    clientName,
    clientId,
    clientAddress,
    clientPhone,
    cakeId,
    cakeName,
    cakePrice,
    cakeDescription,
    cakeImage,
    orderId,
    quantity,
    createdAt
  ] = row;

  const newDate = dayjs(createdAt).format('YYYY-MM-DD HH:mm')
  const priceC = cakePrice*1
  const cakePriceShow = (cakePrice*1).toFixed(2)
  const totalPrice = parseInt(quantity) * priceC.toFixed(2)
  return {
    client:{
        id: clientId,
        name: clientName,
        address: clientAddress,
        phone: clientPhone
    },
    cake:{
        id: cakeId,
        name: cakeName,
        price: cakePriceShow,
        description: cakeDescription,
        image: cakeImage
    },
    orderId,
    createdAt: newDate,
    quantity,
    totalPrice: totalPrice.toFixed(2)
  }
}
