import joi from "joi";

const cakeSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().min(1).required(),
    description: joi.string(),
    image: joi.string().uri().required()
});

export default cakeSchema;
