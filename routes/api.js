var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Flip = mongoose.model('Flip');

router.route('/flips')

	// Create a flip
    .post(function(req, res){
    	console.log('post request /flips');
    	var flip 			= new Flip();
		flip.title 			= req.body.title;
		flip.description 	= req.body.description;
		flip.email 			= req.body.email;
		flip.price 			= req.body.price;
		flip.save(function(err, flip){
			if(err){
				return res.status(500).send(err);
			}
			return res.json(flip);
		});
    })

    // Get all flip
    .get(function(req, res){
    	console.log('get request /flips');
    	Flip.find(function(err, flip){
			if(err){
				return res.send(500, err);
			}
			return res.send(flip);
		});
    })

router.route('/flips/:id')

    .get(function(req, res){
        Flip.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);
            res.json(post);
        });
    }) 

router.route('/search')

    // Query wildcard to match title or description
    .post(function(req, res){
    	Flip.find(
    	{ 
    		$or : 
    		[
        		{"title" :  new RegExp(req.body.query)},
        		{"description" :  new RegExp(req.body.query)}
    		]
		},function(err,flip){
    		if(err){
    			return res.status(500).send(err);
    		}
    		return res.json(flip);
    	});
    })


module.exports = router;
