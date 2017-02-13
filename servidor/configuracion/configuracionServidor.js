let path          = require('path');
let passport      = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let morgan        = require('morgan');
let cookieParser  = require('cookie-parser');
const bodyParser  = require("body-parser");


const errores = require('../middleware/errores');
const sesion  = require('../middleware/sesion');

module.exports = (app) => {
	let cliente = path.join(__dirname,'../../cliente');

	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);
	app.set('views', `${cliente}/vistas` );	
	app.use('/publico', require('express').static(`${cliente}/estaticos`));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	
	if(app.env === 'dev'){
		app.use(morgan('combined'));
	}

	app.use(cookieParser());
	app.use(require('express-session')({
    secret: 'una vez bese un caballo', 
    resave: false,
    saveUninitialized: false
	}));
	
	passport.use('autentificar', 
		new LocalStrategy(
			{
				usernameField: 'correo',
    		passwordField: 'clave'
			},
			sesion.autentificar
	));

	passport.serializeUser((usuario, done) => { done(null, usuario.id); } );
	passport.deserializeUser((id, done) => { console.log(id);
		UsuarioModelo.findById(id, function(err, usuario) {
	   done(err, usuario);
	  });
	});
	
	app.use(passport.initialize());
	app.use(passport.session());

	
	app.use(require('./rutas'));


	app.use(errores.json);


};