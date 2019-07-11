var session = require('express-session');
module.exports = function(sd){
	var sessionMaxAge = 365 * 24 * 60 * 60 * 1000;
	if(typeof sd.config.session == 'number'){
		sessionMaxAge = sd.config.session;
	}
	var store;
	if(sd.mongoUrl){
		store = new(require("connect-mongo")(session))({
			url: sd.mongoUrl
		});
	}
	sd.app.use(session({
		key: 'express.sid.'+sd.config.prefix,
		secret: 'thisIsCoolSecretFromWaWFramework'+sd.config.prefix,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: sessionMaxAge,
			domain: sd.config.domain||undefined
		},
		rolling: true,
		store: store
	}));
}