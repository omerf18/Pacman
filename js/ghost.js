'use strict'
const GHOST = '👻';
const WEAK = '💨';
// var gGhostId = 0;

var gGhosts = []
var gIntervalGhosts;
var gNextId = 0;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        id: gNextId++
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST

}

function createGhosts(board) {
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === WEAK) return;
    if (nextCell === SUPER) return;
    if (nextCell === PACMAN && gPacman.isSuper === false) {
        gameOver(false);
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // dom
    renderCell(ghost.location, ghost.currCellContent);
    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]

    if (!gPacman.isSuper) {
        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        // dom
        renderCell(ghost.location, getGhostHTML(ghost))
    } else {
        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, WEAK);
    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`
}