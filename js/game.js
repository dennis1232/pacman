'use strict'
const WALL = '☢️';
const FOOD = '🐜';
const EMPTY = ' ';
const SUPERFOOD = '🍀';
const CHERRY = '🍒';
var gNumFood = 55;
var gCountCollectedFood = 0;
var gCherryInterval;

var gBoard;
var gGame = {//משתנה שמחזיק אובייקט  הוא מחזיק את הסקור ואם המשחק מופעל 
    score: 0,
    isOn: false

}


function init() {//הפונקציה שמחזיקה את כל הפונקציות שמופעלות כאשר הדף נטען

    console.log('hello');
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    gCountCollectedFood = 0;
    gCherryInterval = setInterval(addCherry, 15000);
}
 function eatSuperFood(){
     var elGhost = document.querySelector('span');
     elGhost.style.backgroundColor = 'blue';
    
 }
function addCherry() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var pos = { i: i, j: j };
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push(pos);
            }
        }
    }
    var rndidx = getRandomIntInclusive(0, emptyCells.length - 1);
    var rndPos = emptyCells[rndidx];

    gBoard[rndPos.i][rndPos.j] = CHERRY;
    renderCell(rndPos, CHERRY);

}


function buildBoard() {//פונקציה שבונה את הבורד בעזרת לולאות היכן יהיו חומות ,אוכל
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if ((i === 1 && j === 8) ||
                (i === 8 && j === 1) ||
                (i === 1 && j === 1) ||
                (i === 8 && j === 8)) {
                board[i][j] = SUPERFOOD
            }
            else if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}
function renderBoard() {

}

function victory() {

    var strHTML = 'VICTORIOUS!!!!';
    var elVictory = document.querySelector('.title h1 span');
    elVictory.innerText = strHTML;
    var elButton = document.querySelector('.btn button');
    elButton.style.display = 'block';
    gGame.isOn = false;

}

function updateScore(diff) {//פונקציה שמעדכנת את ניקוד בדום
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if (gNumFood === gCountCollectedFood) {
        victory();

    }

}



function gameOver() {//פונקציה שבעזרתה המשחק נגמר..ומנקה את האינטרול של הרוחות
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    var elButton = document.querySelector('.btn button')
    console.log(elButton);
    elButton.style.display = 'block'

}

