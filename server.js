const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res, next) => {
	var now = new Date().toString();
	var log = now + ' ' + req.method + ' ' + req.url
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	// console.log(now, req._parsedOriginalUrl.pathname);
	console.log(now, ' ', req.method, ' ', req.url);
	next();
})

app.use((req,res, next) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintenance Page'
	});

	//next();
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// response for root of web server 
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	// res.send({
	//	name: 'Moshe',
	//	age: '51',
	//	address: 'Sde-warburg'
	//});
	res.render('home.hbs', {
		pageTitle: 'Welcome Page',
		welcomeMessage: 'All of you are welcome to this awesome web site',
	});
});

app.get('/about', (req, res) => {
	// res.send('About page', 
	res.render('about.hbs',{
		pageTitle: 'About page'
	});
});

// 
// /bad app - send JSON with error message property
app.get('/bad', (req, res) => {
	res.send({
		error: 'Bad page error',
		errCode: '700',
		message: 'Invented bad page text by MR'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});