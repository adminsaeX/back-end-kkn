var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges

var time = new Date( new Date().getTime() + 7 * 3600 * 1000);
var time_str = time.toString();
var app = require('express')();
var bodyParser = require('body-parser');
var port = process.env.PORT || 9010;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	//databaseURL: "https://solarpump-ec15e.firebaseio.com/"
  });
const db = admin.firestore();  
const kkn2_device = require("./kkn2_device.json");
//console.log(kkn2_device);

app.post('/data', function (req, res) {
	var json_data = req.body;
	json_data = {...json_data,date:time};
	var device_id = String(req.body.dev_ID);
    res.send('200');
	//console.log(json);
	console.log(device_id);
	
var picked = kkn2_device.find(o => o.device_ID === device_id);
if(picked){
	db.collection("KKN22019_data").add(json_data);
}
else
{
	db.collection("KKN12019_data").add(json_data);
}


	
});

app.listen(port, function() {
	console.log('back-end-kkn-runing ' + port);
});