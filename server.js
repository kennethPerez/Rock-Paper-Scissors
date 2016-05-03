// MEAN Stack RESTful API - Rock-Paper-Scissors App
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

// String connection to MongoDB
//var MONGO_URL = "mongodb://kenneth-3151:t2PUvFR_q_JQBxGdmLf2@kenneth-3151.mongo.dbs.appsdeck.eu:30420/kenneth-3151";
var MONGO_URL = "mongodb://localhost/championship";

// Create connecion with database
mongoose.connect(MONGO_URL, function (err, res) {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Setting UI
app.use(express.static(__dirname + '/public'));

// Middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());


// Import Models and controllers
var models = require('./app/models/player')(app, mongoose);
var playersController = require('./app/controllers/players');

// API Routes
var Championship = express.Router();

Championship.route('/result')
    .post(playersController.addResult);

Championship.route('/top')
    .get(playersController.top);

Championship.route('/new')
    .post(playersController.new);

Championship.route('/restart')
    .delete(playersController.restart);

app.use('/api/championship', Championship);


// Setting port to running aplication
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App running on port", port);
});
