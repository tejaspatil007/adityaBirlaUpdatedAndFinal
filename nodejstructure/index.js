const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

require('./models/tables')(app);

const routes = require('./router/router');
app.use(routes);

app.listen(8000,()=>console.log("Server running on port:3000"));