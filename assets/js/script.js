// Element Selectors
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var myBtn = document.querySelectorAll("#myBtn");
var questionsElement = document.querySelector(".questions-text");
var choicesElement = document.querySelector(".choices-buttons");

// Variables

var timer;
var timerCount;
var qLimit;
var currentQ;

const myQuestions = [
    { question: "Which one is true?", answers: { 1: "False", 2: "False", 3: "True", 4: "False" }, correctAnswer: "3" },
    { question: "Which one is false?", answers: { 1: "False", 2: "True", 3: "True", 4: "True" }, correctAnswer: "2" },
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

    console.log("Current Q: " + currentQ);
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
        console.log("Choice: " + choice);

        console.log(myQuestions[currentQuestion].answers[choice]);
        answers.push(`<button class="button-choice" value="${choice}">${myQuestions[currentQuestion].answers[choice]}</button>`);
        // button.innerText = myQuestions[currentQuestion].answers[choice];
    }

    output.push(
        `<div class="question"> ${myQuestions[currentQuestion].question} </div>`
    );

    // for (choice in myQuestions[currentQuestion].answers) {
    //     button.innerHTML = myQuestions[currentQuestion].answers[choice];
    //     choice++;
    // }
    questionsElement.innerHTML = output.join("");
    choicesElement.innerHTML = answers.join("");

    let buttons = document.querySelectorAll("button.button-choice");
    buttons.forEach(button => {
        button.addEventListener("click", checkAnswer);
    });
    // const buttonId = [];
    // for (choice in myQuestions[currentQuestion].answers) {
    //     buttonId.push(`q${currentQ}-${choice}`);
    //     console.log(buttonId[choice]);
    //     document.getElementById(buttonId[choice]).addEventListener("click", checkAnswer(getElementById(buttonId[choice]).value))
    // }
}

function endGame() {

}

function checkAnswer() {
    console.log(this.value);
    // console.log(typeOf(this.value));
    console.log("The correct answer should be " + myQuestions[currentQ].correctAnswer);
    // console.log(typeOf(myQuestions[currentQ].correctAnswer));
    // Checks if guess is the correct answer
    if (this.value == myQuestions[currentQ].correctAnswer) {
        console.log("Correct Answer!!");
        return true;
    } else {
        timerCount -= 5;
        console.log("Wrong Answer!!");
        return false;
    }
    currentQ++;
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