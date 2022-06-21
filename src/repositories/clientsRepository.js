import db from "../config/db.js";

async function addClient(name, address, phone) {
  return db.query(
    `INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3)`,
    [name, address, phone]
  );
}

const clientsRepository = {
    addClient
};

export default clientsRepository;
