(function() {
    'use strict';

    angular
        .module('app')
        .service('topService', topService);

    function topService ($http, $q) {       

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