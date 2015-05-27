var mongoose = require('mongoose');

var flipSchema = new mongoose.Schema({
    title: 			{type : String, required : true, trim : true},
    description: 	{type : String, required : true, trim : true},
    email: 			{type : String, required : true, trim : true},
    price: 			{type : Number, required : true, trim : true},
    created: 		{type: Date, default: Date.now}
});

mongoose.model('Flip', flipSchema);