let buttonColors = ['red', 'green', 'yellow', 'blue'];
let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let h2 = document.querySelector("h2");
let body = document.querySelector('body');
let startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', function() {
    if (!started) {
        started = true;
        console.log("Game has started");
        levelUp();
    }
});
document.addEventListener('keypress', function() {
    if (!started) {
        started = true;
        console.log("Game has started");
        levelUp();
    }
});

function startGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = true;
    h2.innerText = `Level ${level}`;
    levelUp();
}
function flash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 250);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randInd = Math.floor(Math.random() * buttonColors.length);
    let randCol = buttonColors[randInd];

    gameSeq.push(randCol);
    console.log(`Game Sequence = ${gameSeq}`);
    let randBtn = document.querySelector(`.${randCol}`);
    flash(randBtn);
}

function checkAns(ind) {
    if (userSeq[ind] === gameSeq[ind]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Flash after 2 seconds
        }
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore);
            updateHighScoreDisplay();
        }
        h2.innerText = `Game Over. Your Score was ${level}. Press Any Key to start again`;
        body.style.backgroundColor = 'red'; // Change background color to red
        started = false;

        level = 0;
        userSeq = [];
        gameSeq = [];
    }
}

function updateHighScoreDisplay() {
    let highScoreElement = document.createElement('p');
    highScoreElement.id = 'high-score';
    highScoreElement.innerText = `High Score: ${highScore}`;
    let existingHighScoreElement = document.getElementById('high-score');
    if (existingHighScoreElement) {
        existingHighScoreElement.remove();
    }
    document.querySelector('header').appendChild(highScoreElement);
}

function btnPress() {
    if (started) {
        const btn = this;
        flash(btn);
        const userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".box");

for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}////////


