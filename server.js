const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const config = require('./settings/config');
const app = express();

// connect database
mongoose.Promise = require('bluebird');
mongoose.connect(config.dbUrl, { useMongoClient: true } )
    .then(() => { // if all is ok we will be here
        console.log('Db initialized');
        
    })
    .catch(err => { // if error we will be here
        console.error('DB starting error', err);
        //process.exit(1);
    });

    // parse request bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// allow cross origin requests
app.use(cors());

// serving routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// run server 
app.listen(port);
console.log(`Bigprint listening on ${port}`);