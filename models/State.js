var Move = require("./Move");
var State = function (brd, player) {
    
    
    if (brd)
        this.board = brd;
    else
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    if (player)
        this.currentPlayer = player;
    else
        this.currentPlayer = 0;
    
    this.nextPlayer = 0;
    
    this.score = function () {
        if (this.currentPlayer == 1 && this.win()) {
            return -10;
        } else if (this.currentPlayer == 2 && this.win()) {
            return 10;
        } else return 0;
    };
    
    this.isGameOver = function () {
        if (this.win()) return true;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.board[i][j] == 0)
                    return false;
            };
        };
        return true;
    };
    
    this.win = function () {
        var win = false;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.board[i][j] == this.currentPlayer) win = true;
                else { win = false; break; }
            };
            if (win) break;
        };
        if (!win) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (this.board[j][i] == this.currentPlayer) win = true;
                    else { win = false; break; }
                };
                if (win) break;
            };
        }
        if (!win) {
            
            if ((this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2] && this.board[0][0] == this.currentPlayer) ||
                (this.board[2][0] == this.board[1][1] && this.board[2][0] == this.board[0][2] && this.board[2][0] == this.currentPlayer))
                win = true;
        }
        return win;
    };
    
    this.updateBoard = function (mv) {
        this.board[mv.x][mv.y] = this.currentPlayer;
    };
    
    this.getAvailableMoves = function () {
        var moves = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.board[i][j] == 0) moves.push(new Move(i, j));
            };
		    
        };
        return moves;
    };
	
};

module.exports = State;