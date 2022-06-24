import db from "../config/db.js";

async function addClient(name, address, phone) {
  return db.query(
    `INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3)`,
    [name, address, phone]
  );
}

async function getAllClientOrders(responseId) {
  return db.query({text: `SELECT o.id as "orderId", o.quantity, o."createdAt", ca."name" as "cakeName", ca.price 
  FROM orders o
  JOIN cakes ca ON ca.id = o."cakeId"
  WHERE o."clientId" = $1`, rowMode:"array"}, [responseId]);
}

const clientsRepository = {
  addClient,
  getAllClientOrders
};

export default clientsRepository;
