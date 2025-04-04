const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.send('Movies');
});

module.exports = router;