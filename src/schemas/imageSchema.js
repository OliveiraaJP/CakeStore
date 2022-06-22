import joi from "joi";

const imageSchema = joi.object({
    image: joi.string().uri().required()
});

export default imageSchema;