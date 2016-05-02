
(function() {
    'use strict';

    angular
        .module('app')
        .controller('topController', topController);

    function topController ($scope, topService) {
        var vm = this;       

        vm.count = "";
        vm.listPlayers = [];
        vm.getTop = getTop;
        vm.restore = restore;   
        vm.getTop();
        

        function getTop() {
            topService.top(vm.count)
            .then(function (response) {
                vm.listPlayers = [];
                
                for (var i = 0; i < response.players.length; i++) { 
                    if(i == 0)
                        vm.listPlayers.push({name: response.players[i], position: "first"});
                    
                    else if(i == 1)
                        vm.listPlayers.push({name: response.players[i], position: "second"});
                            
                    else if(i == 2)
                        vm.listPlayers.push({name: response.players[i], position: "third"});
                                
                    else
                        vm.listPlayers.push({name: response.players[i], position: "other"});                
                }                
            })
            .catch(function (err) {
                swal( 'Sorry!! An error was occurred.', err,'error');
            });         
        }

        function restore() {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the data deleted of the database.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
                 function (isConfirm) {
                if (isConfirm) {

                    topService.restore()
                    .then(function (response) {
                        swal("Deleted", "The database was restored.", "success");
                        vm.listPlayers = [];
                    })
                    .catch(function (err) {
                        swal( 'Sorry!! An error was occurred.', err,'error');
                    });                      
                } 
            });

        };

    }
})();