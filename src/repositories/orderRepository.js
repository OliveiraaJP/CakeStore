import db from "../config/db.js";

async function verifyCake(id) {
  return db.query(`SELECT * FROM cakes WHERE id=$1`, [id]);
}

async function verifyClient(id) {
  return db.query(`SELECT * FROM clients WHERE id=$1`, [id]);
}

async function verifyOrder(id){
  return db.query(`SELECT * FROM orders WHERE id=$1`, [id])
}

async function addOrder(clientId, cakeId, quantity) {
  return db.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity) VALUES ($1,$2,$3)`,
    [clientId, cakeId, quantity]
  );
}

async function getOrders(whereClause, responseDate) {
  return db.query({text: `SELECT cl."name" as "clientName", cl.id as "clientId", cl.address as "clientAddress",
  cl.phone as "clientPhone",
  ca.id as "cakeId",ca.name as "cakeName",ca.price as "cakePrice",
  ca.description as "cakeDescription", ca.image as "cakeImage",
  o.id as "orderId", o.quantity,o."createdAt" 
  FROM orders o  
  JOIN cakes ca ON ca.id = o."cakeId"
  JOIN clients cl ON cl.id = o."clientId"
  ${whereClause}`, rowMode: "array"}, [responseDate]);
}

async function getOneOrder(responseId){
  return db.query({text: `SELECT cl."name" as "clientName", cl.id as "clientId", cl.address as "clientAddress",
  cl.phone as "clientPhone",
  ca.id as "cakeId",ca.name as "cakeName",ca.price as "cakePrice",
  ca.description as "cakeDescription", ca.image as "cakeImage",
  o.id as "orderId", o.quantity,o."createdAt" 
  FROM orders o  
  JOIN cakes ca ON ca.id = o."cakeId"
  JOIN clients cl ON cl.id = o."clientId"
  WHERE o.id = $1`, rowMode: "array"}, [responseId]);
}

const orderRepository = {
  verifyCake,
  verifyClient,
  verifyOrder,
  addOrder,
  getOrders,
  getOneOrder
};

export default orderRepository;
