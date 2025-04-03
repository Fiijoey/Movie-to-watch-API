const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'Movies to Watch Api',
        description:'Movies to Watch Api'
    },
    host: 'localhost:3000',
    schemes: ['https','http']

};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);