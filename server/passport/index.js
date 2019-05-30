var passport = require('passport');
module.exports = function(sd){
	sd.app.use(passport.initialize());
	sd.app.use(passport.session());
	// support old code
	sd._passport = passport;
	sd._config = sd.config;
}