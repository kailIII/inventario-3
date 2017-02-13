
let plantillaErrores = (err) => {

};



module.exports.json = (err, req, res, next) => {
	console.log(err);
};


module.exports.html = (err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
	  message: err.message,
	  error: err
	});
};