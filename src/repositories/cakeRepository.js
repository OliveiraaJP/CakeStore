import db from "../config/db.js";

async function addCake(name, price, image, description) {
  return db.query(
    `INSERT INTO cakes (name, price, image, description) VALUES ($1,$2,$3,$4)`,
    [name, price, image, description]
  );
}

async function verifyCake(name){
    return db.query(`SELECT * FROM cakes WHERE name=$1`, [name])
}

const cakeRepository = {
  addCake,
  verifyCake
};

export default cakeRepository;
