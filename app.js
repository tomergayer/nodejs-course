const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const port = 3000;
const host = "localhost";
//const server = http.createServer(app);
const errorHandler = require('./middlewares/error')
const notFoundErrorHandler = require('./middlewares/404')
const githubRoute = require('./routes/github');
const guestsRoute = require('./routes/guests');
const usersRoute = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);


app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
