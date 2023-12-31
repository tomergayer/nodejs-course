//import * as queryString from 'query-string';

const express = require('express');
const queryString = require('query-string');
const axios = require('axios');
const router = express.Router();
const config = require('config');
const client_secret = config.get('github.client.secret');;
const client_id = config.get('github.client.id');
const redirect_uri = 'http://303-08:3000/github/callback';


const auth = require('../middlewares/gitHubAuth');

router.get('/', auth.authenticate('github', { scope: [ 'user:email' ] })); 
router.get('/callback', auth.authenticate('github', { failureRedirect: '/users/welcome', successRedirect: '/users/dashboard' }))





// router.get('/', (req,res) => {
//     const params = queryString.stringify({
//         client_id: client_id,
//         redirect_uri: redirect_uri,
//         scope: ['read:user', 'user:email'].join(' '), // space seperated string
//         allow_signup: false,
//       });
//       const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
//       res.redirect(githubLoginUrl);
// });

// router.get('/callback', async (req,res) => {
//    const code = req.query.code
//    res.send(await getGitHubUserData(await getAccessTokenFromCode(code)));
// });

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
      url: 'https://github.com/login/oauth/access_token',
      method: 'get',
      params: {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code,
      },
    });
    /**
     * GitHub returns data as a string we must parse.
     */
    const parsedData = queryString.parse(data);
    //console.log(parsedData); // { token_type, access_token, error, error_description }
    if (parsedData.error) throw new Error(parsedData.error_description)
    return parsedData.access_token;
  };


  async function getGitHubUserData(access_token) {
    const { data } = await axios({
      url: 'https://api.github.com/user',
      method: 'get',
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    //console.log(data); // { id, email, name, login, avatar_url }
    return data;
  };

module.exports = router;
