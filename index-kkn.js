
var app = require('express')();
var bodyParser = require('body-parser');
var port = process.env.PORT || 9010;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.post('/data', function (req, res) {
	var json = req.body;
	var device_id = String(req.body.dev_ID);
    res.send('200');
	console.log(json);
	console.log(device_id)
	
});

app.listen(port, function() {
	console.log('back-end-kkn-runing ' + port);
});