const User = require('./models/User');
const mongoose = require('mongoose');
const config = require('./settings/config');

const newUser = new User();

mongoose.Promise = require('bluebird');
mongoose.connect(config.dbUrl, { useMongoClient: true } )
    .then(() => { // if all is ok we will be here
        console.log('Db initialized');

        newUser.name = "Jakir";
		newUser.username = "jakir";
		newUser.password = "jakir";

		console.log(newUser);

		newUser.save(function(err, user) {
		    if (err)
		        console.log("Sign up failed");
		    else{
		        console.log(user)
		    }

		});
        
    })
    .catch(err => { // if error we will be here
        console.error('DB starting error');
        //process.exit(1);
    });


