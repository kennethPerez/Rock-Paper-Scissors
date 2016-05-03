(function() {
    'use strict';

    angular
        .module('app')
        .controller('championshipController', championshipController);

    function championshipController($scope, championshipService, topService) {
        var vm = this;

        // Count of players to show in top.
        vm.count = "";
        // List of players for the top.
        vm.listPlayers = [];

        vm.showContent = showContent;
        vm.processChampioship = processChampioship;
        vm.getTop = getTop;
        vm.restore = restore;

        /**
         * This method is used to fill the content of files.
         *
         * @param {String} $fileContent
         *   Content of file.
         */
        function showContent($fileContent) {
            vm.content = $fileContent;
        };

        /**
         * This method is used to resolve the championship.
         *
         */
        function processChampioship() {

            championshipService.new(vm.content)
                .then(function (response) {
                swal({
                    title: 'The winner of the championship is '+response.winner[0]+' with the strategy '+response.winner[1]+'.',
                    text: 'The points of the first and second position of the championship were registred in the database.',
                    imageUrl: '/assets/layouts/img/champion.jpg',
                    animation: true
                });
                vm.getTop();
            })
                .catch(function (err) {
                swal(
                    'Sorry!! An error was occurred.',
                    err+".",
                    'error'
                );
            });
        };

        /**
         * This method is used to get the top of players.
         *
         */
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

        /**
         * This method is used to restore the database.
         *
         */
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
                        vm.count = "";
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
