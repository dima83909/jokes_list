var User = require(__dirname+'/schema.js');
module.exports = function(sd) {
	var router = sd._initRouter('/api/user');
	router.post("/avatar", function(req, res) {
		req.user.avatarUrl = '/api/user/avatar/' + req.user._id + '.jpg?' + Date.now();
		sd._parallel([function(n){
			req.user.save(n);
		}, function(n){
			sd._dataUrlToLocation(req.body.dataUrl,
				__dirname + '/files/', req.user._id + '.jpg', n);
		}], function(){
			res.json(req.user.avatarUrl);
		});
	});
	router.get("/avatar/:file", function(req, res) {
		res.sendFile(__dirname + '/files/' + req.params.file);
	});
	router.get("/default.png", function(req, res) {
		res.sendFile(__dirname + '/files/avatar.png');
	});
};