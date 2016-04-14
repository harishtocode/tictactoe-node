var State = require("./State");
var Move = require("./Move");
var BestMove = require("./BestMove");

exports.getChildState = function getChildState(state, move) {
	var s = new State();
	s.board = JSON.parse(JSON.stringify(state.board));//get clone
	s.currentPlayer = state.currentPlayer;
	console.log(JSON.stringify(state.board) + " " + move.x + " " + move.y);
	s.board[move.x][move.y] = state.currentPlayer;
	return s;
};

exports.miniMax = function miniMax(state) {
	if (state.isGameOver())
		return new BestMove(new Move(-1, -1), state.score());
	var scores = [], moves = [],
		availableMoves = state.getAvailableMoves();
	for (var i = 0; i < availableMoves.length ; i++) {
		var move = availableMoves[i];
		moves.push(move);
		var nextState = this.getChildState(state, move);
		if (nextState.isGameOver())
			scores.push(nextState.score());
		else {
			nextState.currentPlayer = (state.currentPlayer == 1) ? 2 :  1;
			var bestMove = this.miniMax(nextState);
			scores.push(bestMove.score);
		}
	};
	if (state.currentPlayer == 2) {
		var max = scores.max(), maxInd = scores.indexOf(max);
		return new BestMove(moves[maxInd], max);
	}
	if (state.currentPlayer == 1) {
		var min = scores.min(), minInd = scores.indexOf(min);
		return new BestMove(moves[minInd], min);
	}
};

//helper method
Array.prototype.max = function () {
	return Math.max.apply(null, this);
};
Array.prototype.min = function () {
	return Math.min.apply(null, this);
};
