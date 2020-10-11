'use strict'
const GHOST = '🎅';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board) {//פונקציה שמייצרת את הרוחות כאובייקט ומאיפה הם יתחילו
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        backGroundColor : getRandomColor()

}
gGhosts.push(ghost)
board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {//פונקציה שמייצרת את כמות הרוחות שאנו רוצים בבורד וגם את האינטרוול
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {//פונקציה שמזיזה את הרוחות זאת אומרת
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {/// הפונקציה שנותנת לכל רוח את הכיוון לאן תתקדם ,מה קורה כאשר היא נפגשת עם משתנה אחר בבורד וגם מפעילה את סיום המשחקל
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {//פוקציה שמזיזה בצורה רנדומלית את הרוחות למעלה למטה ימינה ושמאל
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

// var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

function getGhostHTML(ghost) {//פוקנציה שמחזיקה את אימוגי של הרוח
    return `<span style ="background-color:${ghost.backGroundColor};">${GHOST}</span>`
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}