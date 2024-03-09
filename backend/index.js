const Express = require('express')
const mongodb = require('./dbConfig.js');
const mongoose = require('mongoose')
const cors = require('cors');


const port = 5000

const app = Express()

app.use(Express.json())

app.use(cors());

mongodb
    .then(() => {
        app.listen(port, (() => {
            console.log(`App at ${port}`);
        }))
    })
    .catch((error) => {
        console.log('ERROR1');
    })
app.use('/api/', require('./Routes/Users.jsx'));
app.use('/data/', require('./Routes/Data.jsx'))

