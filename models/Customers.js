	var mongoose = require('mongoose');

	  var Schema = mongoose.Schema;
	
		var CustomerSchema = new Schema({
		  name: { type: String, required: true },
		  phone: { type: String, required: true },
		  email: { type: String, required: true },
		  age: { type: String, required: true }
		  
		});
		
	module.exports = mongoose.model('Customers', CustomerSchema)
