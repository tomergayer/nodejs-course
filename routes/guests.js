const express = require('express');
const router = express.Router();
const config = require('config');
const client_id = config.get('github.client.id');

router.get('/welcome', (req,res) => {
    res.render('users\\welcome', {
        CLIENT_ID: client_id,
      });
});

module.exports = router;
