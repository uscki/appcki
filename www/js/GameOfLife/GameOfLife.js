angular.module('appcki.GoL', [])
.controller("GameOfLifeController", ['$scope', '$state', '$interval',
function($scope, $state, $interval){

	$scope.newGame = function(){
		$scope.board = init($scope.height, $scope.width);
	};

	$scope.toggle = function (row, cell) {
        $scope.board[row][cell] = !$scope.board[row][cell];
        computeNext($scope.board);
    };

    $scope.playPause = function()
    {
    	if(angular.isDefined(interval))
    	{
    		$interval.cancel(interval);
    		interval = undefined;
    		$scope.toggleText = "Start";
    	} else {
    		interval = $interval(update, $scope.speed);
    		$scope.toggleText = "Stop";
    	}

    	if(!angular.isDefined(start))
    	{
    		start = $scope.board;
    	}
    };

    $scope.speedChanged = function(newSpeed)
    {
    	$scope.speed = newSpeed;

		if(angular.isDefined(interval))
		{
			$interval.cancel(interval);
			interval = $interval(update, $scope.speed);
		}
    };

    $scope.reset = function(){
    	$scope.board = (angular.isDefined(start)) ? start : $scope.board;
    };

    $scope.doNew = function()
    {
    	$scope.newGame();
    	start = undefined;
    };


	$scope.width = Math.floor((window.innerWidth - 20) / 32);
	$scope.height = Math.floor(((window.innerHeight / 100 * 70) - 20 )/ 32);
	$scope.toggleText = "Start";
	$scope.speed = 1000;
	$scope.newGame();
	var interval;
	var start;

	function init(height, width)
	{
		var board = [];
		for (var h = 0; h < height; h++)
		{
			var row = [];
			for(var w = 0; w < width; w++)
			{
				row.push(false);
			}
			board.push(row);
		}
		return board;
	}

	function computeNext(board) {
        var newBoard = [];
        for (var r = 0 ; r < board.length ; r++) {
            var newRow = [];
            for (var c = 0 ; c < board[r].length ; c++) {
                newRow.push(willLive(board, r, c) || newCell(board, r, c));
            }
            newBoard.push(newRow); 
        }
        return newBoard;
    }

    var update = function()
    {
    	$scope.board = computeNext($scope.board);	
    };

	function willLive(board, row, cell) {
        return cellAt(board, row, cell) && neighbours(board, row, cell) >= 2 && neighbours(board, row, cell) <= 3;
    }

    function willDie(board, row, cell) {
        return cellAt(board, row, cell) && (neighbours(board, row, cell) < 2 || neighbours(board, row, cell) > 3);
    }

    function newCell(board, row, cell) {
        return !cellAt(board, row, cell) && neighbours(board, row, cell) == 3;
    }

    
    function neighbours(board, row, cell) {
        var n = 0;
        n += cellAt(board, row-1, cell-1) ? 1 : 0;
        n += cellAt(board, row-1, cell+0) ? 1 : 0;
        n += cellAt(board, row-1, cell+1) ? 1 : 0;
        n += cellAt(board, row+0, cell-1) ? 1 : 0;
        n += cellAt(board, row+0, cell+1) ? 1 : 0;
        n += cellAt(board, row+1, cell-1) ? 1 : 0;
        n += cellAt(board, row+1, cell+0) ? 1 : 0;
        n += cellAt(board, row+1, cell+1) ? 1 : 0;
        return n;
    }
    
    function cellAt(board, row, cell) {
        row = (row >= 0) ? ( (row < board.length) ? row : 0 ) : board.length - 1;
        cell = (cell >= 0) ? ( (cell < board[row].length) ? cell : 0) : board[row].length - 1;
        return board[row][cell];

    }

}])
.directive('appckiGameOfLife', [
    function(){
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                scope.width = Math.floor((window.innerWidth - 20) / 32);
                scope.height = Math.floor(((window.innerHeight / 100 * 70) - 20 )/ 32);
                scope.toggleText = "Start";
                scope.speed = 1000;
                scope.newGame();
                var interval;
                var start;
            },
            templateUrl: 'js/GameOfLife/cells.html'
        };
    }
]);