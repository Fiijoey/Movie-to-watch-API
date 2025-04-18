const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Movies to Watch Api",
    description: "Movies to Watch Api",
  },
  // host: "movie-to-watch-api-k551.onrender.com",
  host: "movie-to-watch-api-k551.onrender.com/",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js')
});