'use strict'
const PACMAN = '🐒';
const SUPER = '🦍';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === SUPERFOOD) gPacman.isSuper = true;
    if (nextCell === GHOST && gPacman.isSuper) {
        console.log('ghost', gBoard[nextLocation.i][nextLocation.j]);

        // var removed = gGhosts.splice(id,1);
        // console.log(removed);
        // console.log(gGhosts);
    }
    else if (nextCell === GHOST && gPacman.isSuper === false) {
        gameOver(false);
        renderCell(gPacman.location, EMPTY)
        return;
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    if (!gPacman.isSuper) {
        // update the model
        gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
        // update the dom
        renderCell(gPacman.location, PACMAN);
    } else {
        // update the model
        gBoard[gPacman.location.i][gPacman.location.j] = SUPER;
        // update the dom
        renderCell(gPacman.location, SUPER);
    }



}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}