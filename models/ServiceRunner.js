var Service = require('./Service');
var State = require("./State");
var Move = require("./Move");
var BestMove = require("./BestMove");

exports.getBlankBoard = function getBlankBoard() {
	return new State();
};

exports.Run = function Run(board, move) {
	board.currentPlayer = 1;
	board.updateBoard(move);
    if (board.win()) {
        return { success : "W", b: board };
	}
	board.currentPlayer = 2;
	board.nextPlayer = 1;
	var aiPlayer = Service.miniMax(board);
	if (aiPlayer.move.x == -1) {
        return { success : "D", b: board };
	}
	board.updateBoard(new Move(aiPlayer.move.x, aiPlayer.move.y));
	
	if (board.win()) { 
        return { success : "L", b: board };
	}
	return { success : "C", b: board };

};
