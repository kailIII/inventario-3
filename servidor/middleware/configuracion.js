const UsuarioModel = require('../modelos/usuario');

module.exports = (rango) => {
	return (req, res, next) => { 
		UsuarioModel.findOne({rango}, (err, alguno) => {
			if(err) {
				return next(err);
			}
	
			if(!alguno){
				return next(); 
			}
		
			res.status(401);
			res.json({'mensaje':'prohibido'});
		});
	};
};