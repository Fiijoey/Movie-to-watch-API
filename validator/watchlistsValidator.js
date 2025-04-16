const joi = require('@hapi/joi');

const watchlistRules = joi.object({
    name: joi.string().required(),
    movies: joi.array().items(
        joi.object({
            movieId: joi.string().required(),
            status: joi.string().required()
        })
    ).required()
});

module.exports = { watchlistRules };