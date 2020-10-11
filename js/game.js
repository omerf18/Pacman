'use strict'
const WALL = '🧱';
const FOOD = '🍌';
const EMPTY = ' ';
const SUPERFOOD = '🥩';

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gTotalFoodCount = 56;

function init() {
    console.log('hello')
    gBoard = buildBoard()
    gTotalFoodCount = 56;
    gGame.score = 0;
    createPacman(gBoard);
    printMat(gBoard, '.board-container')
    updateScore(false);
    gGhosts = [];
    gNextId = 0;
    createGhosts(gBoard);
    gPacman.isSuper = false;
    gGame.isOn = true;
    var elWinModal = document.querySelector('.win-modal');
    elWinModal.style.display = "none";
    var elLoseModal = document.querySelector('.lose-modal');
    elLoseModal.style.display = "none";
    console.log(gGhosts)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = SUPERFOOD;
    board[8][8] = SUPERFOOD;
    board[8][1] = SUPERFOOD;
    board[1][8] = SUPERFOOD;
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === gTotalFoodCount) {
        gameOver(true);
    }
}

function gameOver(win) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    if (win) {
        var elWinModal = document.querySelector('.win-modal');
        elWinModal.style.display = "block";
    } else {
        var elWinModal = document.querySelector('.lose-modal');
        elWinModal.style.display = "block";
    }
}
