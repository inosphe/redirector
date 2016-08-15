var express = require('express');
var bodyParser = require('body-parser');
var session = require('./session.json');

var app = new express();
app.use(bodyParser.json());

var redirect_host, redirect_port;

app.get('/', function(req, res){
	if(redirect_host){
		if(redirect_port)
			res.redirect('http://'+redirect_host+':'+redirect_port)
		else
			res.redirect('http://'+redirect_host);
	}
	else{
		res.status(404).send('no application');
	}
})

if(session.session)
	app.put('/' + session.session, function(req, res){
		redirect_host = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		redirect_port = req.body.port || 8080;
		console.log(redirect_host, redirect_port);
		res.send({
			redirect_host
			, redirect_port
		})
	})

var port = process.env.PORT || 8000;
app.listen(port)
console.log('listen on ' + port);
