'use strict'

var gRows = 4;
var gBoardSize = gRows ** 2;
var gNums;
var clickNext = 1;
var gameStartTime = 0;
var gTimerInterval = null;
var victoryHeader = document.querySelector('.victory');
var newGameBtn = document.querySelector('button.new');

function init() {
    gNums = setBoardSize(gRows);
    console.log(gNums);
    renderBoard(gRows, gNums);
}

function setBoardSize(size) {
    var length = size ** 2;
    var nums = [];
    for (var i = 1; i <= length; i++) {
        nums.push(i);
    }
    shuffle(nums);
    return nums;
}

function renderBoard(rows, nums) {
    var strHtml = '';
    for (var i = 0; i < rows; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < rows; j++) {
            var currNum = nums.pop(j);
            strHtml +=
                `<td class="board">
                <button class="button" onclick="cellClicked(this, ${currNum})">
                ${currNum}</button>
                </td>`
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(elButton, clickedNum) {
    var result = false;

    if (clickedNum === 1) {
        victoryHeader.style.display = 'none';
        getStartTime();
        gTimerInterval = setInterval(getIntervalTime, 5);
        console.log('Game began!');
    }
    if (clickedNum === gBoardSize && clickedNum === clickNext) {
        console.log('Game ended!');
        console.log('Victory');
        victoryHeader.style.display = 'block';
        newGameBtn.style.display = 'block';

        clearInterval(gTimerInterval);
    }
    if (clickedNum === clickNext) {
        result = true;
        clickNext++;
        elButton.classList.add('correct');
        console.log('Clicked:', clickedNum, 'Next num:', clickNext);
    } else {
        console.log('Wrong!');
    }
    return result;
}

function switchDifficulty(size) {
    gRows = size;
    gBoardSize = size ** 2;
    console.log(gBoardSize);
    gNums = setBoardSize(size);
    renderBoard(size, gNums);
    clearInterval(gTimerInterval);
    clickNext = 1;
    gameStartTime = 0;
    gTimerInterval = null;
}

function newGame() {
    init();
    clearInterval(gTimerInterval);
    clickNext = 1;
    gameStartTime = 0;
    gTimerInterval = null;
    victoryHeader.style.display = 'none';
    newGameBtn.style.display = 'none';
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getStartTime() {
    gameStartTime = Date.now();
}

function getIntervalTime() {
    var timeStamp = Date.now();
    var delta = timeStamp - gameStartTime;
    formatTime(delta);
}

function formatTime(num) {
    var timeFormat = num / 1000;
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = `<span>${timeFormat}</span>`;
}