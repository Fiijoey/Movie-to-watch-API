const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Movie to watch API",
        description: "API for CSE341 Final Project",
    },
    host: "localhost:3000",
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
});