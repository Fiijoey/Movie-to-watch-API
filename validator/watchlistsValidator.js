const joi = require('@hapi/joi');

const watchlistRules = joi.object({
    name: joi.string().required(),
    user_id: joi.string().required(),
    movies: joi.required()
});

module.exports = { watchlistRules };