const router = require('express').Router();

router.get('/', function(req, res, next) {
    res.send('Reviews');
});

module.exports = router;