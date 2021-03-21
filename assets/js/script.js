// Element Selectors
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var questionsElement = document.querySelector(".questions-text");

// Variables

var timer;
var timerCount;
var qLimit;
var currentQ;

const myQuestions = [
    { question: "Which one is true?", answers: { 1: "False", 2: "False", 3: "True", 4: "False" }, correctAnswer: "3" },
    { question: "Which one is false?", answers: { 1: "False", 2: "True", 3: "True", 4: "True" }, correctAnswer: "1" },
    { question: "Which one is true?", answers: { 1: "False", 2: "False", 3: "True", 4: "False" }, correctAnswer: "3" },
    { question: "Which one is true?", answers: { 1: "False", 2: "False", 3: "True", 4: "False" }, correctAnswer: "3" }
];

// Functions
function initGame() {
    var qLimit = Object.keys(myQuestions).length;
    currentQ = 0;
}

function startGame() {
    timerCount = 5;

    startTimer();
    displayQuestion(currentQ);
}

function displayQuestion(currentQuestion) {
    const output = [];

    console.log(currentQ);
    console.log(currentQuestion);
    console.log(myQuestions[currentQuestion].answers)

    const answers = [];

    for (choice in myQuestions[currentQuestion].answers) {
        answers.push(`<button name="q${currentQ}-${choice}" value="${choice}">
        ${myQuestions[currentQuestion].answers[choice]}
      </button>`);
    }

    output.push(
        `<div class="question"> ${myQuestions[currentQuestion].question} </div>
        <div class="answers"> ${answers.join('')} </div>`
    );

    questionsElement.innerHTML = output.join("");
    currentQ++;

    const buttonId = [];
    for (choice in myQuestions[currentQuestion].answers) {
        buttonId.push(`q${currentQ}-${choice}`);
        console.log(buttonId[choice]);
        document.getElementById(buttonId[choice]).addEventListener("click", checkAnswer(getElementById(buttonId[choice]).value))
    }
}

function endGame() {

}

function checkAnswer(guess) {

    // Checks if guess is the correct answer
    if (guess === questionsArr.correct) {
        return true;
    } else {
        timerCount -= 5;
        return false;
    }
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

    initGame();
    startGame();
    // endGame();

}

// Event listener for start button
startButton.addEventListener("click", playGame);
