const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/movies', require('./movies'));

router.use('/users', require('./users'));

router.use('/reviews', require('./reviews'));

router.use('/watchlists', require('./watchlists'));

router.get('/login', passport.authenticate('github'), (req,res)=>{});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if (err) {return next(err);}
        res.redirect('/');
    });
        
       
});



module.exports = router;