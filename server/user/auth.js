var User = require(__dirname+'/schema.js');
var mongoose = require('mongoose');
var passport = require('passport');
module.exports = function(sd) {
	sd.use(passport.initialize());
	sd.use(passport.session());
	if(mongoose.connection.readyState==0){
		mongoose.connect(sd.mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});
		mongoose.set('useCreateIndex', true);
		mongoose.Promise = global.Promise;
	}
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	/*
	*	Initialize User and Mongoose
	*/
		var router = sd.router('/api/user');
		router.get("/me", function(req, res) {
			var json = {};
			if(req.user){
				User.schema.eachPath(function(path) {
					path = path.split('.')[0];
					if(path=='password'||path=='__v'||json[path]) return;
					json[path] = req.user[path];
				});
			}else{
				json.data = req.session.data;
			}
			if(!json.data) json.data = {};
			res.json(json);
		});
		router.post("/status", function(req, res) {
			User.findOne({
				$or: [{
					reg_email: req.body.email.toLowerCase()
				},{
					email: req.body.email.toLowerCase()
				}]
			}, function(err, user) {
				var json = {};
				json.email = !!user;
				if(user&&req.body.password){
					json.pass = user.validPassword(req.body.password);
				}
				res.json(json);
			});
		});
		router.post("/request", function(req, res) {
			User.findOne({
				email: req.body.email.toLowerCase()
			}, function(err, user) {
				user.data.resetPin = Math.floor(Math.random() * (999999 - 100000)) + 100000;
				console.log(user.data.resetPin);
				user.data.resetCreate = new Date().getTime();
				user.data.resetCounter = 3;
				user.markModified('data'); 
					user.save(function(err){
						if (err) throw err;
						res.json(true);
						sd.send({
							to: user.email,
							title: 'Code: '+user.data.resetPin,
							html: 'Code: '+user.data.resetPin
						}, function(){
							//res.json(true);
						});
					});
				});
		});
		router.post("/change", function(req, res) {
			User.findOne({
				email: req.body.email.toLowerCase()
			}, function(err, user) {
				var message;
				var now = new Date().getTime();
				if (user.data.resetCounter > 0 && (now - user.data.resetCreate) <= 600000) {
					if (user.data.resetPin == req.body.pin) {
						user.password = user.generateHash(req.body.password);
						message = 'Password successfully changed.';
						delete user.data.resetPin;
						delete user.data.resetCounter;
						delete user.data.resetCreate;
					} else {
						user.data.resetCounter--;
						message = 'Wrong code.';
					}
				} else {
					message = 'I am sorry reset code is not active now.'
					delete user.data.resetPin;
					delete user.data.resetCounter;
					delete user.data.resetCreate;

				}
				user.markModified('data'); 
				user.save(function(err) {
					if (err) throw err;
					res.json(message);
				});
			});
		});
		router.post("/changePassword", sd._ensure, function(req, res) {
			if (req.user.validPassword(req.body.oldPass)){
				req.user.password = req.user.generateHash(req.body.newPass);
				req.user.save(function(){
					res.json(true);
				});
			}else res.json(false);
		});
		router.get('/logout', function(req, res) {
			req.logout();
			res.redirect(sd.config.user.local.successRedirect);
		});
		router.get('/logout-local', function(req, res) {
			req.logout();
			res.json(true);
		});
	/*
	*	Passport Management
	*/
		var LocalStrategy = require('passport-local').Strategy;
		router.post('/login-local', passport.authenticate('login-local'), function(req, res) {
			let user = JSON.parse(JSON.stringify(req.user));
			delete user.password;
			delete user.recPass;
			delete user.recUntil;
			res.json(user);
		});
		passport.use('login-local', new LocalStrategy(function(username, password, done) {
			User.findOne({
				email: username.toLowerCase(),
				blocked: {
					$ne: true
				}
			}, function(err, user) {
				if (err) return done(err);
				if (!user) return done(null, false);
				if (!user.validPassword(password)) return done(null, false);
				return done(null, user);
			});
		}));
		router.post('/login', passport.authenticate('login', {
			successRedirect: '/',
			failureRedirect: '/Login'
		}));
		passport.use('login', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password'
		}, function(username, password, done) {
			User.findOne({
				email: username.toLowerCase(),
				blocked: {
					$ne: true
				}
			}, function(err, user) {
				if (err) return done(err);
				if (!user) return done(null, false);
				if (!user.validPassword(password)) return done(null, false);
				return done(null, user);
			});
		}));
		router.post('/signup-local', passport.authenticate('signup'), function(req, res) {
			let user = JSON.parse(JSON.stringify(req.user));
			delete user.password;
			delete user.recPass;
			delete user.recUntil;
			res.json(user);
		});
		passport.use('signup', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true
		}, function(req, username, password, done) {
			User.findOne({
				'email': username.toLowerCase()
			}, function(err, user) {
				if (err) return done(err);
				if (user) return done(null, false);
				else {
					var newUser = new User();
					newUser.is = {
						admin: false
					};
					newUser.name = req.body.name;
					newUser.email = username.toLowerCase();
					newUser.password = newUser.generateHash(password);
					newUser.data = req.session.data && typeof req.session.data == 'object' && req.session.data || {};
					newUser.data.fr = []
					newUser.data.friends = []
					newUser.data.balance = {}
					newUser.data.phone = ''
					newUser.save(function(err) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		}));
		router.post('/signup', passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/Sign'
		}));
		passport.use('local-signup', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true
		}, function(req, username, password, done) {
			User.findOne({
				'email': username.toLowerCase()
			}, function(err, user) {
				if (err) return done(err);
				if (user) return done(null, false);
				else {
					var newUser = new User();
					newUser.is = {
						admin: false
					};
					newUser.email = username.toLowerCase();
					newUser.password = newUser.generateHash(password);
					newUser.data = req.session.data && typeof req.session.data == 'object' && req.session.data || {};
					newUser.save(function(err) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		}));
	// Google
		if (sd.config.user.google) {
			var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
			router.get('/google', passport.authenticate('google', {
				scope: ['profile', 'email']
			}));
			router.get('/google/callback', passport.authenticate('google', {
				successRedirect: '/',
				failureRedirect: '/'
			}));
			passport.use('google', new GoogleStrategy({
				clientID: sd.config.user.google.clientID,
				clientSecret: sd.config.user.google.clientSecret,
				callbackURL: sd.config.user.google.callbackURL,
				passReqToCallback: true
			}, function(req, token, refreshToken, profile, done) {
				User.findOne({
					_id: req.user._id
				}, function(err, user) {
					if (err) return done(err);
					if (user) {
						var google = {};
						google.id = profile.id;
						google.url = profile._json.url;
						req.user.saveGoogle(google, function() {});
						return done(null, user);
					}
				});
			}));
		}
		// Instagram
		if (sd.config.user.instagram) {
			var InstagramStrategy= require('passport-instagram').Strategy;
			router.get('/instagram',
				passport.authenticate('instagram')
				);
			router.get('/instagram/callback', passport.authenticate('instagram', {
				failureRedirect: '/login'
			}), function(req, res) {
				res.redirect('/');
			});
			passport.use('instagram',new InstagramStrategy({
				clientID : sd.config.user.instagram.clientID,
				clientSecret : sd.config.user.instagram.clientSecret,
				callbackURL : sd.config.user.instagram.callbackURL,
				passReqToCallback:true
			}, function (req, accessToken, refreshToken, profile, done) {
				User.findOne({
					_id: req.user._id
				}, function(err, user) {
					if (err) return done(err);
					if (user) {
						var instagram = {};
						instagram.id = profile.id;
						instagram.username = profile.username;
						req.user.saveInstagram(instagram, function() {});
						return done(null, user);
					}
				});
			}));
		}
		// Facebook
		if (sd.config.user.facebook) {
			var FacebookStrategy = require('passport-facebook').Strategy;
			router.get('/facebook', passport.authenticate('facebook', {
				display: 'page',
				scope: 'email'
			}));
			router.get('/facebook/callback', passport.authenticate('facebook', {
				failureRedirect: '/login'
			}), function(req, res) {
				res.redirect('/');
			});
			passport.use('facebook',new FacebookStrategy({
				clientID: sd.config.user.facebook.clientID,
				clientSecret: sd.config.user.facebook.clientSecret,
				callbackURL: sd.config.user.facebook.callbackURL,
				profileFields: ['id', 'profileUrl'],
				passReqToCallback:true
			}, function (req,token, refreshToken, profile, done) {
				console.log(profile);
				User.findOne({
					_id:req.user._id
				},
				function (err, user) {
					if (err)return done(err);
					if (user) {
						var facebook={};
						facebook.profileUrl=profile.profileUrl;
						facebook.id=profile.id;
						req.user.saveFacebook(facebook,function(){
						});
						return done(null, user);
					}
				});
			}));
		}
		// Twitter
		if (sd.config.user.twitter) {
			var TwitterStrategy = require('passport-twitter').Strategy;
			passport.use(new TwitterStrategy({
				consumerKey: sd.config.user.twitter.consumerKey,
				consumerSecret: sd.config.user.twitter.consumerSecret,
				callbackURL: sd.config.user.twitter.callbackURL
			},function(token, tokenSecret, profile, done) {
				process.nextTick(function() {
					User.findOne({
						'twitter.id': profile.id
					}, function(err, user) {
						if (err) return done(err);
						else if (user) return done(null, user);
						else {
							var newUser = new User();
							newUser.twitter = {
								displayName : profile.displayName,
								username : profile.username,
								id : profile.id,
								token : token,
							}
							newUser.save(function(err) {
								console.log(newUser);
								if (err) throw err;
								return done(null, newUser);
							});
						}
					});
				});
			}));
			router.get('/twitter', passport.authenticate('twitter'));
			router.get('/twitter/callback', passport.authenticate('twitter', {
				successRedirect: sd.config.user.twitter.successRedirect,
				failureRedirect: sd.config.user.twitter.failureRedirect
			}),function(req, res) {
				res.redirect(sd.config.user.twitter.successRedirect);
			});
		}
	// End of Crud
};