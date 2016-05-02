(function() {
    'use strict';

    angular
        .module('app')
        .controller('championshipController', championshipController);

    function championshipController($scope, ChampionshipService) {
        var vm = this;

        vm.showContent = showContent;        
        vm.processChampioship = processChampioship;
        vm.download = download;

        vm.fileOne = '[["Armando","P"],["Dave","S"]]';
        
        vm.fileTwo = '[\n\t[\n\t\t[["Armando","P"],["Dave","S"]],\n\t\t[["Richard","R"],["Michael","S"]]\n\t],\n\t[\n\t\t[["Allen","S"],["Omer","P"]],\n\t\t[["John","R"],["Robert","P"]]\n\t]\n]';
        
        vm.fileThree = '[\n\t[\n\t\t[\n\t\t\t[["Armando","P"],["Dave","R"]],\n\t\t\t[["Richard","P"],["Michael","S"]]\n\t\t],\n\t\t[\n\t\t\t[["Allen","S"],["Omer","P"]],\n\t\t\t[["John","R"],["Robert","P"]]\n\t\t]\n\t],\n\t[\n\t\t[\n\t\t\t[["Luis","S"],["David","P"]],\n\t\t\t[["Carlos","R"],["Kenneth","P"]]\n\t\t],\n\t\t[\n\t\t\t[["Alonso","S"],["Edgar","P"]],\n\t\t\t[["Oscar","R"],["Jose","P"]]\n\t\t]\n\t]\n]';
        
        vm.fileFour = '[\n\t[\n\t\t[\n\t\t\t[\n\t\t\t\t[["Armando","P"],["Dave","R"]],\n\t\t\t\t[["Richard","P"],["Michael","R"]]\n\t\t\t],\n\t\t\t[\n\t\t\t\t[["Allen","S"],["Omer","P"]],\n\t\t\t\t[["John","R"],["Robert","P"]]\n\t\t\t]\n\t\t],\n\t\t[\n\t\t\t[\n\t\t\t\t[["Luis","S"],["David","P"]],\n\t\t\t\t[["Carlos","R"],["Kenneth","P"]]\n\t\t\t],\n\t\t\t[\n\t\t\t\t[["Alonso","S"],["Edgar","P"]],\n\t\t\t\t[["Oscar","R"],["Jose","P"]]\n\t\t\t]\n\t\t]\n\t],\n\t[\n\t\t[\n\t\t\t[\n\t\t\t\t[["Giselle","P"],["Pedro","R"]],\n\t\t\t\t[["Juan","P"],["Gretel","R"]]\n\t\t\t],\n\t\t\t[\n\t\t\t\t[["Miguel","S"],["Abel","R"]],\n\t\t\t\t[["Alan","S"],["Gabriela","P"]]\n\t\t\t]\n\t\t],\n\t\t[\n\t\t\t[\n\t\t\t\t[["Elena","R"],["Brian","P"]],\n\t\t\t\t[["Camilo","S"],["Fabiana","R"]]\n\t\t\t],\n\t\t\t[\n\t\t\t\t[["Emanuel","R"],["Maria","P"]],\n\t\t\t\t[["Amanda","P"],["Brigitte","S"]]\n\t\t\t]\n\t\t]\n\t]\n]';

        function showContent($fileContent) {
            vm.content = $fileContent;            
        };
        function processChampioship() {

            ChampionshipService.new(vm.content)
                .then(function (response) {
                swal({
                    title: 'The winner of the championship is '+response.winner[0]+' with the strategy '+response.winner[1]+'.',
                    text: 'The points of the first and second position of the championship were registred in the database.',
                    imageUrl: '/assets/layouts/layout4/img/champion.jpg',
                    animation: true
                });
            })
                .catch(function (err) {
                swal(
                    'Sorry!! An error was occurred.',
                    err+".",
                    'error'
                );
            });   
        };

        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
})();