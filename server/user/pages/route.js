module.exports = function(sd) {
	sd._app.get('/', function(req, res) {
		if(req.get('host')=='style.panianka.com'){
			res.send(sd._derer.renderFile(__dirname + '/stylesmade.com.html', {
				title: 'Styles Panianka - змоделювати і купити сукню онлайн',
				description: 'Styles Рanianka - проект для швачок та покупців, який дозволяє конструювати сукнівласноруч та замовити їх пошиття або купити сукні будь-якого розміру, що є в каталозі.',
				image: 'https://style.panianka.com/api/user/cdn/styles/seo.png',
				keywords: 'panianka сукні ціна, styles panianka пошити сукню, весільна сукня купити, вечірні плаття, власне виробництво суконь, дитячі святкові плаття україна, замовити сукню україна, замовити сукню, змоделювати сукню, купити плаття недорого, купити сукню, купити сукню каталог, купити сукню на замовлення онлайн, магазин суконь , магазин вечірніх суконь, онлайн магазин суконь, пошити сукню онлайн, пошити сукню, пошити сукню на замовлення, самостійно створити плаття, святкові плаття, швачки онлайн вільний графік, широкий асортимент якісних суконь'
			}));
		}else{
			res.send(sd._derer.renderFile(__dirname + '/Landing.html', {
				nowYear: new Date().getFullYear(),
				title: 'Web Art Work ',
				description: 'WebArt.Work provides a full range of custom software services, integrated web solutions and business process automation, including software development and web development of mobile and desktop applications. Our services cover all stages of the software development life cycle.',
				image: 'https://webart.work/api/user/cdn/waw-logo.png',
				keywords: 'WebArt.Work, Home Page, WebArt.Work Home Page? full range, custom software services, integrated web solutions, business process automation, software development, web development, mobile and desktop applications, full range of custom software services, web solutions, business, process, ,software, development, web,mobile, desktop, applications.'
			}));
		}
	});
	sd._app.get('/styles', function(req, res) {
		res.send(sd._derer.renderFile(__dirname + '/stylesmade.com.html', {
			title: 'Styles Panianka - змоделювати і купити сукню онлайн',
			description: 'Styles Рanianka - проект для швачок та покупців, який дозволяє конструювати сукнівласноруч та замовити їх пошиття або купити сукні будь-якого розміру, що є в каталозі.',
			image: 'https://style.panianka.com/api/user/cdn/styles/seo.png',
			keywords: 'panianka сукні ціна, styles panianka пошити сукню, весільна сукня купити, вечірні плаття, власне виробництво суконь, дитячі святкові плаття україна, замовити сукню україна, замовити сукню, змоделювати сукню, купити плаття недорого, купити сукню, купити сукню каталог, купити сукню на замовлення онлайн, магазин суконь , магазин вечірніх суконь, онлайн магазин суконь, пошити сукню онлайн, пошити сукню, пошити сукню на замовлення, самостійно створити плаття, святкові плаття, швачки онлайн вільний графік, широкий асортимент якісних суконь'
		}));
	});
	sd._app.get('/Login', function(req, res) {
		res.send(sd._derer.renderFile(__dirname + '/Login.html', {
			title: 'Web Art Work | Login',
			description: 'To log in to your profile and use all WebArt.Work tools, you need to enter the email and password that you used when registering your account.',
			image: 'https://webart.work/api/user/cdn/waw-logo.png',
			keywords: 'WebArt.Work, Web, Art, Work, log in, Login, your profile, profile, WebArt.Work tools, tools, user needs to enter an email and password, user, email, password, email and password, registering his account, registering'
		}));
	});
	sd._app.get('/Sign', function(req, res) {
		res.send(sd._derer.renderFile(__dirname + '/Sign.html', {
			title: 'Web Art Work | Sign up',
			description: 'Registration on the site is an action aimed at creating a personal account on a web-resource in order to gain access to its full functionality. On the WebArt.Work website, registration is required so that you can freely use all of the WebArt.Work tools. To do this, enter your email and password in the Sign Up section.',
			image: 'https://webart.work/api/user/cdn/waw-logo.png',
			keywords: 'WebArt.Work, Web, Art, Work, Sign up, Register, Registration on the site, Registration, creating a personal account, creating, personal account, account, web-resource, in order to gain access to its full functionality, order, gain access, full functionality, functionality, WebArt.Work website, website, user, use, WebArt.Work tools, tools, enter your email and password, email and password, email, password, Sign Up modal window, Sign Up, modal window'
		}));
	});
	sd._app.get('/Reset', function(req, res) {
		res.send(sd._derer.renderFile(__dirname + '/Reset.html', {
			title: 'Web Art Work | Reset',
			description: 'If you forget your password, you can reset it. To do this, open a password reset, enter your email and name. An email will be sent to reset the password. You need to click on the link that is specified in the letter and enter a new password.',
			image: 'https://webart.work/api/user/cdn/waw-logo.png',
			keywords: 'WebArt.Work, Web, Art, Work, Reset, user, forgotten the password, password, reset, sending a link, link, create, new password, restore access to the account, restore access, access, account, modal window, password reset, email, username. follow the link, letter, enter a new password.'
		}));
	});
	sd._app.get('/Users', function(req, res) {
		res.send(sd._derer.renderFile(__dirname + '/Users.html', {
			nowYear: new Date().getFullYear(),
			title: 'Web Art Work | Users ',
			description: '',
			image: 'https://webart.work/api/user/cdn/waw-logo.png',
			keywords: ''
		}));
	});
};