const express = require('express');
const router = require('./routes/index');
const app = express();
const port = 3000;


// swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
