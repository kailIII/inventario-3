var http 	= require("http");
var express = require("express");
var app 	= express();
var servidor= http.createServer(app);
var rutas = require("./controles/rutas").rutas;
var conexiondb = require("./controles/conexiondb");

/*-------------muy sexi barra separadora---------------*/

app.configure(function(){
	app.set('view engine', 'ejs');
	app.set('vistas', __dirname+'/vistas');
	app.use(express.bodyParser());
	app.use('/publico', express.static(__dirname+'/estaticos'));
	app.use(express.cookieParser("una vez bese un caballo"));
	app.use(express.session({cookie:{maxAge:300000}}));
});

/*-------------muy sexi barra separadora---------------*/

conexiondb.abriConexion();
rutas(app);

/*-------------muy sexi barra separadora---------------*/

servidor.listen(process.env.port || 3000);