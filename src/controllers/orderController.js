import orderRepository from "../repositories/orderRepository.js";

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
  try {
    const orders = await orderRepository.getOrders();
    console.log(orders.rows.map(_mapOrderObject));


    res.send(orders.rows.map(_mapOrderObject)).status(200);
  } catch (error) {
    console.log("get all order trc error: ", error);
    res.sendStatus(500);
  }
};

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

  const price = cakePrice*1
  const totalPrice = parseInt(quantity) * price.toFixed(2)
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
        price: cakePrice,
        description: cakeDescription,
        image: cakeImage
    },
    orderId,
    createdAt,
    quantity,
    totalPrice: totalPrice.toFixed(2)
  }
}
