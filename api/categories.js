var express = require('express');
var fs = require("fs");
var categoryRouter = express.Router();

categoryRouter.route('/').get(function(req, res){
	fs.readFile('./data/categories.json',function(err, data){
		res.json(JSON.parse(data));
	})
});

module.exports = categoryRouter;