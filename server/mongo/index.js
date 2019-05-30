var mongoose = require('mongoose');
module.exports = function(sd){
	if(sd.config.mongo){
		let mongoAuth = '';
		if(sd.config.mongo.user&&sd.config.mongo.pass){
			mongoAuth = sd.config.mongo.user + ':' + sd.config.mongo.pass + '@';
		}
		sd._mongoUrl = 'mongodb://'+mongoAuth+(sd.config.mongo.host||'localhost')+':'+(sd.config.mongo.port||'27017')+'/'+(sd.config.mongo.db||'test');
	}
}