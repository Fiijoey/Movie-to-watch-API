const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello, and welcome to the Movie to Watch API!");
});

module.exports = router;
