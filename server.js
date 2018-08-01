// set up ======================================================================
var express = require('express');
var app = express(); // create our app w/ express
var port = process.env.PORT || 8080; // set the port
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
//mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); // set the static files location /public/img will be /img for users

//app.use(express.static('./Ang/dist/Ang'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.use('/node_modules', express.static(__dirname + '/node_modules'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://adminuser:123@cluster0-d53ex.mongodb.net';
// Database Name
const dbName = 'name';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    function getTodos(res) {
        db.collection('name').find().toArray((err, todos) => {
            console.log("get to server");
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            res.json(todos); // return all todos in JSON format
        });
    }
    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });

    app.post('/api/todos', function (req, res) {
        console.log(req.body);
        db.collection("name").save({
            'german': req.body.Germanoutput,
            'tamil': req.body.Tamiloutput,
            'english': req.body.Englishinput,
            'description': req.body.Description,
            'UpdatedOn': new Date()
        }, (err, result) => {
            if (err) {
                console.log(err);
            }
        }, function (err, todo) {
            if (err)
                res.send(err);
            getTodos(res);
        });
    });

    app.delete('/api/todos/:todo_id', function (req, res) {
        db.collection("name").drop(function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");

        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/Public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


});

// routes ======================================================================
//require('./app/routes.js')(app);



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);