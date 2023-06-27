const express = require('express');
const router = express.Router();
const joiMiddleware = require('../middlewares/joi');
const symbolValidator = require('../controllers/users/validator');

router.get('/logout', (req,res) => {

});
router.get('/dashboard', (req,res) => {

});
router.post('/symbol', joiMiddleware(symbolValidator), (req,res) => {
        res.send("valid")
});

module.exports = router;
