const express = require("express");
const app = express();
const http = require("http");
const port = 3000;
const host = "localhost";
//const server = http.createServer(app);

const githubRoute = require('./routes/github');
const guestsRoute = require('./routes/guests');
const usersRoute = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
