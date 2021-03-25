// Element Selectors
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var clearButton = document.querySelector(".button-clear");

var questionsSection = document.querySelector(".questions");
var questionsElement = document.querySelector(".questions-text");
var choicesElement = document.querySelector(".choices-buttons");
var highScoresElement = document.querySelector(".high-scores");
var highScoresList = document.querySelector(".list-high-scores");

var userInput = document.querySelector("#user-text");
var userForm = document.querySelector("#user-form");

// Variables

var timer;
var timerCount;
var qLimit;
var qIndex;
var buttons;
var userName;
var correct;

var users = [];
var scores = [];

const myQuestions = [
    { question: "Inside which HTML element do we put the JavaScript??", answers: { 1: "script", 2: "head", 3: "meta", 4: "style" }, correctAnswer: "1" },
    { question: "Which of the following is the correct syntax to display \"Letsfindcourse\" in an alert box using JavaScript?", answers: { 1: "alert-box(\"Letsfindcourse\");", 2: "confirm(\"Letsfindcourse\");", 3: "msgbox(\"Letsfindcourse\");", 4: "alert(\"Letsfindcourse\");" }, correctAnswer: "4" },
    { question: "JavaScript is designed for following purpose:", answers: { 1: "to style HTML pages", 2: "to execute Queries related to databases on a server", 3: " to add interactivity to html pages", 4: "All of the above" }, correctAnswer: "4" },
    { question: "Which of these is not the looping structures in JavaScript?", answers: { 1: "for", 2: "while", 3: "forwhich", 4: "dowhile", }, correctAnswer: "3" },
    { question: "Which of the following method checks if its argument is not a number?", answers: { 1: "isNaN()", 2: "nonNaN()", 3: "NaN()", 4: "None of the above", }, correctAnswer: "1" },
    { question: "What if you use parseInt() to convert a string containing decimal value?", answers: { 1: "Throws Error", 2: "It returns the decimal values in string form", 3: "If returns only the integer portion of the number", 4: "None of the listed option", }, correctAnswer: "3" },
    { question: "What is the purpose of the Attr object in the HTML DOM?", answers: { 1: "Used to focus on a particular part of the HTML page", 2: "HTML Attribute", 3: "Used to arrange elements", 4: "None of the above", }, correctAnswer: "2" },
    { question: "How to get a particular value using the tagged name?", answers: { 1: "getElementbyID()", 2: "getElementsbyName()", 3: "getElementsbyTagName()", 4: "getTagName()", }, correctAnswer: "3" },
    { question: "Which built-in method removes the last element from an array and returns that element?", answers: { 1: "last()", 2: "get()", 3: "pop()", 4: "None of the above", }, correctAnswer: "3" },
    { question: "How do you round the number 7.25 to the nearest integer?", answers: { 1: "Math.rnd(7.25)", 2: "Math.round(7.25)", 3: "rnd(7.25)", 4: "round(7.25)", }, correctAnswer: "2" }
];

// Functions
function initGame() {
    questionsSection.setAttribute("style", "display:none;");
    getScore();
    renderScores();
    qLimit = myQuestions.length;

}

function startGame() {
    highScoresElement.setAttribute("style", "display:none;");
    questionsSection.setAttribute("style", "display:block;");
    qIndex = 0;
    correct = 0;
    timerCount = 50;
    startButton.disabled = true;
    startButton.setAttribute("style", "display:none")
    displayQuestion(qIndex);
    startTimer();
}

function buttonListeners(action) {
    buttons = document.querySelectorAll("button.button-choice");
    // console.log(action);
    if (action == "active") {
        buttons.forEach(button => {
            button.addEventListener("click", checkAnswer);
        });
    }
    if (action == "disable") {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }
}

function displayQuestion(currentQuestion) {

    const output = [];

    const answers = [];

    for (choice in myQuestions[currentQuestion].answers) {
        answers.push(`<button class="btn btn-secondary my-1 button-choice" value="${choice}">${myQuestions[currentQuestion].answers[choice]}</button>`);
    }
    var questionNo = qIndex + 1;
    output.push(
        `<div class="question"> ${questionNo} - ${myQuestions[currentQuestion].question} </div>`
    );

    questionsElement.innerHTML = output.join("");
    choicesElement.innerHTML = answers.join("");
    buttonListeners("active");

}

function endGame() {
    buttonListeners("disable");
    questionsSection.setAttribute("style", "display:none;");
    highScoresElement.setAttribute("style", "display:block;");
    userInput.disabled = false;
    startButton.setAttribute("style", "display:inline")
    startButton.innerText = "Play Again?";
    startButton.disabled = false;

}

function checkAnswer() {
    // console.log(this.value);
    // console.log(typeOf(this.value));
    // console.log("The correct answer should be " + myQuestions[qIndex].correctAnswer);
    // console.log(typeOf(myQuestions[qIndex].correctAnswer));
    // Checks if guess is the correct answer
    if (this.value == myQuestions[qIndex].correctAnswer) {
        // console.log("Correct Answer!!");
        correct++;
    } else {
        timerCount -= 5;
        // console.log("Wrong Answer!!");
    }
    console.log("Current Q: " + qIndex);
    console.log("Last Q: " + qLimit);
    qIndex++;
    if (qIndex < qLimit) {
        displayQuestion(qIndex);
    } else {
        console.log("CheckAnswer Endgame");
        endGame();
    }
}

function startTimer() {
    // Sets Timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if ((qIndex === qLimit) && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                console.log("setInterval Endgame");
                endGame();
            }
        }
        // Tests if time has run out
        if (timerCount < 0) {
            // Clears interval
            clearInterval(timer);
            timerCount = 0;
            timerElement.textContent = timerCount;
            console.log("TimerCount Endgame");
            endGame();
        }
    }, 1000);
}

function getScore() {
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedUsers !== null) {
        users = storedUsers;
        scores = storedScores;
    }

}

function renderScores() {
    highScoresList.innerHTML = "";
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var score = scores[i];

        var li = document.createElement("li");
        li.textContent = user + " - " + score;
        li.setAttribute("data-index", i);

        highScoresList.appendChild(li);
    }
}

function setScore() {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("scores", JSON.stringify(scores));

    userInput.disabled = true;
}

function clearScores() {
    users = [];
    scores = [];
    localStorage.removeItem("users");
    localStorage.removeItem("scores");
    renderScores();
}

// Main game
function playGame() {

    startGame();
    // endGame();

}
initGame();
// Event listener for start button
startButton.addEventListener("click", playGame);
clearButton.addEventListener("click", clearScores);

// Initiate game when page loads
userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Entered")

    var userText = userInput.value.trim();

    if (userText === "") {
        console.log("Error")
        return;
    }

    var storedUsers = JSON.parse(localStorage.getItem("users"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedUsers !== null) {
        users = storedUsers;
        scores = storedScores;
    }

    // get local storage array OR assign to new array
    // var usersFromStorage = localStorage.getItem("users") || [];
    // var scoreFromStorage = localStorage.getItem("scores") || [];

    users.push(userText);
    scores.push(timerCount);
    // usersFromStorage.push(userText);
    // scoreFromStorage.push(timerCount);

    renderScores();
    setScore();

});
