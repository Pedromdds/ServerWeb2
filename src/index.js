const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');


const app = express();
path1 = path.resolve(__dirname, "..", "src", "tmp", "uploads");
const static = express.static(path1);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/files', static);

require('./controllers/authController')(app);
require('./controllers/reposController')(app);

app.listen(3333);
