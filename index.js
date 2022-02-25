var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');

var db_name='customers_db'
mongoose.connect('mongodb://localhost/'+db_name,{ useNewUrlParser: true,useUnifiedTopology: true });
 
var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true })); 

var Cutomer_Model = require('./models/Customers');


var server = app.listen(8080, 
console.log("Server Started listening requests"));


app.post('/create_customer', function (req, res) {
 	var user_obj = new Cutomer_Model(req.body);

		var return_arr={};
   		user_obj.save(function(err) {
	  	if (err) 	
	  	{   		
	   	    return_arr.status=0;
	   	    return_arr.message=err.message;
	   	}
	  	else
	  	{
	  		return_arr.status=1;
	   	    return_arr.message="Customer Created Successfully";
	  		}
 				res.json(return_arr);
	});
});


app.get('/get_all_customers', function (req, res) {		 
		Cutomer_Model.find({}, function(err, data) {
          var return_arr={};
			  if (err) 	
		  	{   		
		   	    return_arr.status=0;
		   	    return_arr.message=err.message;
		   	}
		  	else
		  	{
		  		return_arr.status=1;
		   	  return_arr.customers=data;
		  	}

	  		res.json(return_arr);
	});
});

app.put('/update_customer/:customer_id', function (req, res) {
 
	var return_arr={};
   		Cutomer_Model.findByIdAndUpdate(req.params.customer_id,req.body,{new: true},function(err) {
	  	if (err) 	
	  	{   		
	   	    return_arr.status=0;
	   	    return_arr.message=err.message;
	   	}
	  	else
	  	{
	  		return_arr.status=1;
	   	    return_arr.message="Customer Updated Successfully";
	  		 
	  	}
 
	  	res.json(return_arr);
	});
});


app.delete('/delete_customer/:customer_id', function (req, res) {
 	var return_arr={};
   		Cutomer_Model.findByIdAndRemove(req.params.customer_id,function(err) {
	  	if (err) 	
	  	{   		
	   	    return_arr.status=0;
	   	    return_arr.message=err.message;
	   	}
	  	else
	  	{
	  		return_arr.status=1;
	   	    return_arr.message="Customer Deleted Successfully";
	  		 
	  	}
 
	  	res.json(return_arr);
	});
});





