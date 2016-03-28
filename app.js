var express = require('express');
var productRouter = require('./api/products')
var categoriesRouter = require('./api/categories')
var app = express();

var PORT = process.env.PORT || 5000;


app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api/products', productRouter);
app.use('/api/categories', categoriesRouter);

app.get('/', function(req, res){
	res.render("index");
});



app.listen(PORT, function (err) {
    console.log('listening port: '+PORT);
});