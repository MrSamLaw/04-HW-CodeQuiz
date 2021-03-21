// Element Selectors
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
// Variables

var timer;
var timerCount;
var qLimit;

const questionsArr = [
    {
        question: "", option01: "", option02: "", option03: "", option04: "", correct: ""
    }, {
        question: "", option01: "", option02: "", option03: "", option04: "", correct: ""
    }, {
        question: "", option01: "", option02: "", option03: "", option04: "", correct: ""
    }, {
        question: "", option01: "", option02: "", option03: "", option04: "", correct: ""
    }, {
        question: "", option01: "", option02: "", option03: "", option04: "", correct: ""
    }, {
        question: "", option01: "", option02: "", option03: "", option04: "", correct: ""
    }];

// Functions
function initGame() {

}

function startGame() {
    timerCount = 5;
    startTimer();
}

function endGame() {

}

function startTimer() {
    // Sets Timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (qLimit && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                endGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Main game
function playGame() {

    // initGame();
    startGame();
    // endGame();

}

// Event listener for start button
startButton.addEventListener("click", playGame);
