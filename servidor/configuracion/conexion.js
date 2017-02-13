const mongoose = require('mongoose');

module.exports = (entorno, callback) => {
	let uri = `mongodb://localhost/inventario_${entorno}`;

	mongoose.Promise = global.Promise;

	mongoose.connect(uri, (err) => {
		if(err){
			console.log(err);
			process.exit(1);
		}

		callback(mongoose.connection);
	});
};