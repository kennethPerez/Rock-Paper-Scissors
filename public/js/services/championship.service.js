(function() {
    'use strict';

    angular
        .module('app')
        .service('championshipService', championshipService);

    function championshipService ($http, $q) {

        /**
         * Method that resolve a tournament.
         *
         *@param {String} tournament
         *  Structure of championship.
         */
        this.new = function (tournament) {
            var defered = $q.defer(),
                promise = defered.promise;
            $http({
                method: 'POST',
                url: "api/championship/new",
                data: {
                    'data': tournament
                }
            })
            .success(function (response) {
                defered.resolve(response);
            })
            .error(function (err) {
                defered.reject(err)
            });
            
            return promise;
        }
    }
})();
