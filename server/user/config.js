var User = require(__dirname+'/schema.js');
module.exports = function(sd) {
	var router = sd._initRouter('/api/user');
	let ensure_admin = sd.ensure_admin = function(req, res, next){
		if(req.user&&req.user.is&&req.user.is.admin) next();
		else res.send(false);
	};
	let ensure_super = sd.ensure_super = function(req, res, next){
		if(req.user&&req.user.is&&req.user.is.super){
			next();
		} 
		else res.send(false);
	};
	/*
	*	waw crud : Get Configuration
	*/
		sd['query_get_user'] = function(){return {}};
		sd['select_get_user'] = function(){return 'avatarUrl skills gender name birth email'};
		sd['ensure_get_user_admin'] = ensure_admin;
		sd['query_get_user_admin'] = function(){return {}};
		sd['select_get_user_admin'] = function(){return '-password'};
	/*
	*	waw crud : Update Configuration
	*/
		sd['ensure_update_all_user_super'] = ensure_super;
		sd['query_update_all_user_super'] = function(req, res, next) {
			return {
				_id: req.body._id
			}
		};
		sd['ensure_update_all_user_admin'] = ensure_admin;
		sd['query_update_all_user_admin'] = function(req, res, next) {
			return {
				_id: req.body._id
			}
		};
		sd['query_update_all_user'] = function(req, res, next) {
			return {
				_id: req.user._id
			}
		};
	/*
	*	waw crud : Delete Configuration
	*/
		sd['ensure_delete_user_admin'] = ensure_admin;
		sd['query_delete_user_admin'] = function(req, res, next){
			return {
				_id: req.body._id
			}
		};
		sd['query_delete_user'] = function(req, res, next){
			return {
				_id: req.user._id
			}
		};
		sd['files_to_remove_delete_user'] = function(req, res, next){
			return __dirname+'/files/'+req.user._id;
		};
	// End of
};