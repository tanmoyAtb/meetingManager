const express = require('express');
const path = require('path');
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

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept,' +
        'X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
// Serve static files from the React app after npm run build

app.use(express.static(process.cwd() + '/public'));
// serving routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



// run server 
app.listen(port);
console.log(`Bigprint listening on ${port}`);