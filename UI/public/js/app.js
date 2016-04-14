var SudokuApp = angular.module("TicTacToeApp", ['ngRoute'])
.config(function ($routeProvider, $locationProvider) {
    
})
.controller('mainController', function ($scope, $http) {
    
    console.log("MainCOntroller Called");
    
    //a blank board has to be presented
    $scope.blankBoard;
    $scope.board;
    $scope.done = false;
   
    $http.get('/home')
        .success(function (data) {
        $scope.board = data.board;
        $scope.blankBoard = data.board;
     
        console.log(data);
    })
        .error(function (data) {
       
        console.log('Error: ' + data);
    });
    
    $scope.move = function (x, y) {
        if (!$scope.done) {
            $(".loader").css("display", "block");
            $http.post('/postmove', { b: $scope.board, x: x, y: y })
            .success(function (data) {
                $(".loader").css("display", "none");
                $scope.board = data.b.board;
                if (data.success == 'W') {
                    $.bootstrapGrowl("You Win!!", { type: 'success', delay: -1 });
                    $scope.done = true;
                }
                if (data.success == 'D') {
                    $.bootstrapGrowl("Its a draw. To play again click on Restart game!!", { type: 'info' , delay: -1});
                    $scope.done = true;
                }
                if (data.success == 'L') {
                    $.bootstrapGrowl("You Lost!!", { type: 'danger', delay: -1 });
                    $scope.done = true;
                }
            //console.log(data.b.board);
            }).error(function (data) {
                $(".loader").css("display", "none");
                $.bootstrapGrowl("Error. Restart game!!", { type: 'danger', delay: -1 });
                $scope.done = false;
            });
        }
    };
    
    $scope.refresh = function () {
        $scope.board = $scope.blankBoard;
        $scope.done = false;
        $('.bootstrap-growl').remove();
    };

});

