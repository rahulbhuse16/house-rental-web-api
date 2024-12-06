import Joi from "joi";
const houseSchema = Joi.object({
    houseName: Joi.string().required(),
    address: Joi.string().required(),
    rentalOfferPrice: Joi.number().required(),
    rentalOriginalPrice: Joi.number().required(),
    sellerName: Joi.string().required(),
    bedrooms: Joi.number().integer().required(),
    bathrooms: Joi.number().integer().required(),
    houseArea: Joi.number().required(),
    description: Joi.string().required(),
});

export default houseSchema;
