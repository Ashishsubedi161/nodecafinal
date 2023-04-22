require('./models/db');

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')

const userController = require('./controllers/userController');
const jobController = require('./controllers/jobController');

var app = express();
app.use(cors())

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/', userController);
app.use('/job', jobController);