// Setting mongoose module and the Model Player
var mongoose = require('mongoose');
var Player  = mongoose.model('Player');

/**
 * This method checks the name in the database, if exist, the points
 * are added to the previous record, otherwise, a new record is
 * created with the information received.
 *
 * @param {String} _name
 *   Name of the player to insert a new result.
 * @param {Integer} _points
 *   Points that the player wins in the new result.
 */
function newResult(_name, _points){
    Player.findOne({ 'name': _name }, function (err, player) {
        if (player)
            player.points = player.points += _points;
        else
            player = new Player({name: _name, points: _points});

        player.save();
    });
}

//POST - Insert a new result in the DB
exports.addResult = function(req, res) {
    newResult(req.body.first, 3);
    newResult(req.body.second, 1);

    console.log('POST /result')
    res.status(200).jsonp({status: 'success'});
};


exports.findAll = function(req, res) {
    Player.find(function(err, players) {
        if(err) res.send(500, err.message);

        console.log('GET /players')
        res.status(200).jsonp(players);
    });
};
