var express = require('express');
var router = express.Router();
var runner = require('../models/ServiceRunner');
var path = require('path');
var Move = require("../models/Move");
router.get('/home', function (req, res) {
	//call Run 
	var newBoard = runner.getBlankBoard();
	req.session.board = newBoard; //update board in session
	res.json(newBoard);
});

router.post('/postmove', function (req, res) {
	//call Run 
	var board = req.body.b;//this is the current board state
	var move = new Move(req.body.x, req.body.y); // this is the user move
	var stateBoard = runner.getBlankBoard();
	stateBoard.board = board;
	var newBoard = runner.Run(stateBoard, move);
	res.json(newBoard);
});

router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname,'../UI/views/index.html'));
        // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;