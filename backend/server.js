const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

// @ts-ignore
global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));


// Configuring the database
const dbConfig = require('./app/configs/database.config.js');
const mongoose = require('mongoose');



const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});




require("./app/routes/route.admin")(app)
require("./app/routes/route.user")(app)
require("./app/routes/route.category")(app)
require("./app/routes/route.question")(app)
require("./app/routes/route.game")(app)



var server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = {server, mongoose}