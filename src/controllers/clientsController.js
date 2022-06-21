import clientsRepository from "../repositories/clientsRepository.js";

export const postClient = async(req, res) => {
    const {name, address, phone} = req.body

    try {
        await clientsRepository.addClient(name, address, phone)
        res.status(201).send('Registered client!')
    } catch (error) {
        console.log('post client trc error: ', error);
        res.sendStatus(500);
    }
}