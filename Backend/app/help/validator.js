const Joi = require("joi")

const validator = (schema) => (payload)=>
    schema.validate(payload, {abort:false});

const registerSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const addRecipeSchema = Joi.object({
    titlo: Joi.string().required(),
    perigrafh: Joi.string().required(),
    category: Joi.object({
        category_id: Joi.string().guid().required(),
        category_name: Joi.string().required(),
        subcategories: Joi.array().items(Joi.object({
            subcategory_name: Joi.string().required(),
            subcategory_id: Joi.string().guid().required()
        })).required()
    }).required(),
    subcategory: Joi.string().allow(null),
    ingredients: Joi.array().items(Joi.object({
        quantity: Joi.number().required(),
        ingredient_name: Joi.string().required(),
        description: Joi.string().required()
    })).required(),
    recipe_portion: Joi.number().required(),
    level: Joi.number().required(),
    time_create: Joi.number().required(),
    time_prepare: Joi.number().required(),
    tags: Joi.array().items(Joi.object({tag_name:Joi.string().required()})).required(),
    photo: Joi.string().required()
});

const editRecipeSchema = Joi.object({
    titlo: Joi.string().required(),
    recipe_id: Joi.string().required(),
    perigrafh: Joi.string().required(),
    category: Joi.object({
        category_id: Joi.string().guid().required(),
        category_name: Joi.string().required(),
        subcategories: Joi.array().items(Joi.object({
            subcategory_name: Joi.string().required(),
            subcategory_id: Joi.string().guid().required()
        })).required()
    }).required(),
    subcategory: Joi.string().allow(null,""),
    ingredients: Joi.array().items(Joi.object({
        quantity: Joi.number().required(),
        ingredient_name: Joi.string().required(),
        description: Joi.string().required()
    })).required(),
    recipe_portion: Joi.number().required(),
    level: Joi.number().required(),
    time_create: Joi.number().required(),
    time_prepare: Joi.number().required(),
    tags: Joi.array().items(Joi.object({tag_name:Joi.string().required()})).required(),
    photo: Joi.string().allow(null,'') // No need to add a new photo
});

exports.validateAddRecipe=validator(addRecipeSchema)
exports.validateEditRecipe=validator(editRecipeSchema)
exports.validateRegister = validator(registerSchema)
exports.validateLogin = validator(loginSchema)