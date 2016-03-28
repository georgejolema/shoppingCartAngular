var express = require('express');
var fs = require('fs');
var productsRouter = express.Router();
var bodyParser = require('body-parser')


productsRouter.use(bodyParser.json())
productsRouter.route('/list/:category')
	.get(function(req, res){
		var data = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
		var products=[];
		each(data, function(item){
			if(item.category==req.params.category)
				products.push(item);
		});
		res.json(products);
	});
productsRouter.route('/coupon')
	.post(function(req, res){
		var data=JSON.parse(fs.readFileSync('./data/coupons.json', 'utf8'));
		var coupon=req.body.coupon;
		for(var i=0;i<data.length;i++){
			if(coupon==data[i].value){
				res.json({valid:true, disccount:data[i].disccount});
				return;
			}
		}
		res.json({valid:false, disccount:-1})
	});
				
function each(data, func){
	for(var i in data){
		func(data[i]);
	}
}
				
module.exports = productsRouter;
