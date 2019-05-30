module.exports = function(appJs, argv){
	require('nodemon')({
		script: appJs,
		ext: 'js json',
		watch: [process.cwd()+'/server', process.cwd()+'/runners']
	});
}