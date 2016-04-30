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
 @param {Object} res
 *   This is the response that server returns in the request.
 */
exports.newResult = function(_name, _points, res) {
    Player.findOne({ 'name': _name }, function (err, player) {
        if(err)
            return res.send(500, err.message);
        if (player)
            player.points = player.points += _points;
        else
            player = new Player({name: _name, points: _points});

        player.save(function(err) {
            if(err) return res.send(500, err.message);
        });
    });
};


/**
 * This method insert a new result in the database, the first player earns three points while the second player earns one point.
 *
 * @param {Object} req
 *   This is the POST request, the data in this request must be name of the first and second player.
 * @param {Object} res
 *   This is the response that server returns in the request.
 */
exports.addResult = function(req, res) {
    exports.newResult(req.body.first, 3, res);
    exports.newResult(req.body.second, 1, res);
    res.status(200).jsonp({status: 'success'});
};


/**
 * This method get the top of best player in the all championships.
 *
 * @param {Object} req
 *   This is the POST request, the data in this request must be a count of the number of players wants in the top,
 *   if this value doesn't exists the algorithm set this value in ten.
 * @param {Object} res
 *   This is the response that server returns in the request.
 */
exports.top = function(req, res) {
    Player.find().sort({ points: -1 }).limit( parseInt(req.query.count == undefined ? 10 : req.query.count) ).select("name").find(function (err, players) {
        if(err)
            return res.send(500, err.message);
        var playersArray = [];
        players.forEach( function(player) {
            playersArray.push( player.name );
        });
        res.status(200).jsonp({players: playersArray});
    });
};


/**
 * This method delete al collection in the database.
 *
 * @param {Object} req
 *   This is the POST request.
 * @param {Object} res
 *   This is the response that server returns in the request.
 */
exports.restart = function(req, res) {
    Player.remove({}, function (err, players) {
        if(err)
            return res.send(500, err.message);
        else
            res.status(200).jsonp({status: 'success'});
    });
};


/**
 * This method calculate winne duel, the algorithm takes a two-element list and verify this for finding errors, if exist errors then raise exception.
 *
 * @param {Object} player1
 *   This object contain the name and the used strategic.
 * @param {Object} player2
 *   This object contain the name and the used strategic.
 * @return {Object}
 *   Return object with the player that wins in the first position, and the second position the player that loses.
 */
exports.winner = function(player1, player2){

    if(typeof(player1[0]) != "string" || typeof(player2[0]) != "string")
        throw "The struccture of the championship is incorrect.";

    var strategyPlayer1 = player1[1],
        strategyPlayer2 = player2[1];

    strategyPlayer1 = strategyPlayer1.toLowerCase();
    strategyPlayer2 = strategyPlayer2.toLowerCase();

    if (strategyPlayer1 != strategyPlayer2) {

        switch(strategyPlayer1) {
            case "r" :
                return strategyPlayer2 == "s" ? [player1, player2] : [player2, player1];
            case "p" :
                return strategyPlayer2 == "r" ? [player1, player2] : [player2, player1];
            case "s" :
                return strategyPlayer2 == "p" ? [player1, player2] : [player2, player1];
            default:
                throw "A player used a different strategy to R-P-S";
        }
    }
    else {
        return [player1, player2]
    }
}


// This variable is used for get the finalist of the championship.
exports.temp = undefined;
exports.tournament_winner = function(tournament){
    if (tournament.length != 2)
        throw "The struccture of the championship is incorrect.";
    if(typeof(tournament[0][0]) === "string"){
        exports.temp = exports.winner(tournament[0], tournament[1]);
        return exports.temp[0]
    }
    return exports.tournament_winner([   exports.tournament_winner(tournament[0]), exports.tournament_winner(tournament[1])  ])

}





exports.new = function(req, res) {

    // Cast of String received in the request to a Javascript array
    var tourney = JSON.parse(req.body.data.replace(/'/g, ''));
    exports.tournament_winner(tourney)
    exports.newResult(exports.temp[0][0], 3, res);
    exports.newResult(exports.temp[1][0], 1, res);

    res.status(200).jsonp({winner: exports.temp[0]});

};



