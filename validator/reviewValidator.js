const Joi = require('@hapi/joi');

const reviewRules = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    rating: Joi.number().min(1).max(10).required(),
    comment: Joi.string().min(3).max(500).required(),
    user_id: Joi.string().required(),
    movie_id: Joi.string().required(),
});

module.exports = { reviewRules };