'use strict'
const PACMAN = '🐻';
var gEatenGhost =0;
var gPacman;
function createPacman(board) {// isSuper: false פונקציה שמחזיקה את האובייקט של הפקמן ואת המיקום שהוא מתחיל בו ומאתחל אותו למצב סופר
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {//הפוקציה שבעזרתה מזיזים את הפקמן בעזרת הכפתורים מאותחל גם כאשר הדף נטען וגם מה הוא יכול ומה לא (קירות ,רוחות)

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        gCountCollectedFood++;
    }
    if (nextCell === CHERRY) {
        updateScore(10);
    }
    if(nextCell === SUPERFOOD){
        
        activateSuper()
    }
    else if (nextCell === GHOST) {
        if(gPacman.isSuper){
            gEatenGhost++
            gGhosts.pop();
          } else {
              gameOver();
              renderCell(gPacman.location, EMPTY);
              return;
          }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {//פונקציה שמאתחלת את הכפתורים לאיזה כיוון ילך הפקמן בלחיצה על כל כפתור
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
function activateSuper() {
    gPacman.isSuper = true;
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].backGroundColor = "blue";
    }
    setTimeout(function () {
      gPacman.isSuper = false;
      console.log(gPacman.isSuper,'super');
      for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor();
      } 
      for (var j = 0; j < gEatenGhost; j++) {
          createGhost(gBoard);
      } 
      gEatenGhost = 0;
    }, 5000);
  }