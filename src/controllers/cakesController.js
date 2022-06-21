import cakeRepository from "../repositories/cakeRepository.js"

export const postCake = async(req, res) => {
    const {name, price, image, description} = req.body
    try {
        const hasCake = await cakeRepository.verifyCake(name)
        if(hasCake.rowCount!==0){
            return res.status(409).send('Cake already exist!')
        }

        await cakeRepository.addCake(name, price, image, description);
        res.status(201).send('Add cake done!')
        
    } catch (error) {
        console.log('error trc post cake: ', error);
        res.sendStatus(500)
    }
}