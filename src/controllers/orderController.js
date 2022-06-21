import orderRepository from "../repositories/orderRepository.js"

export const postOrder = async(req, res) => {
    const {clientId, cakeId, quantity} = req.body

    try {
        const hasClient = await orderRepository.verifyClient(clientId);
        const hasCake = await orderRepository.verifyCake(cakeId);
        if(hasCake.rowCount === 0) return res.status(404).send('Non-existent cake');
        if(hasClient.rowCount === 0) return res.status(404).send('Non-existent client');

        await orderRepository.addOrder(clientId, cakeId, quantity);
        res.status(201).send('Cake(s) ordered!')
    } catch (error) {
        console.log('post order trc error: ', error);
        res.sendStatus(500);
    }
}