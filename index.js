const app = require('./server');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Database is listening and node Running on port ${port}`);
});