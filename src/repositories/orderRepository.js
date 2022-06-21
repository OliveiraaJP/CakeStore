import db from "../config/db.js";

async function verifyCake(id) {
  return db.query(`SELECT * FROM cakes WHERE id=$1`, [id]);
}

async function verifyClient(id) {
  return db.query(`SELECT * FROM clients WHERE id=$1`, [id]);
}

async function addOrder(clientId, cakeId, quantity) {
  return db.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity) VALUES ($1,$2,$3)`,
    [clientId, cakeId, quantity]
  );
}

const orderRepository = {
  verifyCake,
  verifyClient,
  addOrder,
};

export default orderRepository;
