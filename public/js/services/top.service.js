(function() {
    'use strict';

    angular
        .module('app')
        .service('topService', topService);

    function topService ($http, $q) {       

        /**
         * Method that restore the database.
         */
        this.restore = function () {
            var defered = $q.defer(),
                promise = defered.promise;
            $http({
                method: 'DELETE',
                url: "api/championship/restart"
            })
                .success(function (response) {
                defered.resolve(response);
            })
                .error(function (err) {
                defered.reject(err)
            });

            return promise;
        }
        
        /**
         * Method that obtains the top of players.
         *
         *@param {String} count
         *  Number of player for the top.
         */
        this.top = function (count) {
            var defered = $q.defer(),
                promise = defered.promise;

            $http({
                method: 'GET',
                url: "api/championship/top?count="+count,
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
