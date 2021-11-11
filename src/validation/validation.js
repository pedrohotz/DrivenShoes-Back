import joi from 'joi';

const loginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(5).required()
})

const registerValidation = joi.object({
    nome: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(5).required()
})

const cardValidation = joi.object({
    card_number: joi.string().min(16).required(),
    security_number: joi.string().min(3).required(),
    expiration_date: joi.date().required(),
    name: joi.string().min(3).max(30).required(),
})


export {
    loginValidation,
    registerValidation,
    cardValidation,
}