// Element Selectors
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitButton = document.querySelector(".button-submit");
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
    // On Page load, prepares the page and loads scores from localStorage
    questionsSection.setAttribute("style", "display:none;");
    getScore();
    renderScores();
    qLimit = myQuestions.length;
    userInput.disabled = true;
    submitButton.disabled = true;

}

function getScore() {
    //Pulls player names & Scores from localStorage if there are any
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedUsers !== null) {
        users = storedUsers;
        scores = storedScores;
    }
}

function renderScores() {
    // Displays player name & score on the High Scores List
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


function startGame() {
    // Sets/resets game for player
    highScoresElement.setAttribute("style", "display:none;");
    questionsSection.setAttribute("style", "display:block;");

    qIndex = 0;  // Index for questions array of objects
    correct = 0;  // The number of questions answered correctly
    timerCount = 60;  // The total time for guesses to be made

    // Disable and hide the start button once the game starts
    startButton.disabled = true;
    startButton.setAttribute("style", "display:none")

    displayQuestion(qIndex);
    startTimer();
}

function displayQuestion(currentQuestion) {
    // Displays questions & choices for player to answer

    // Arrays used to display questions & choices
    const output = [];
    const answers = [];

    // Take question property from myQuestions array and display it on screen
    var questionNo = qIndex + 1;
    output.push(
        `<div class="question"> ${questionNo} - ${myQuestions[currentQuestion].question} </div>`
    );

    // Take answers property from myQuestions array and display it on screen
    for (choice in myQuestions[currentQuestion].answers) {
        answers.push(`<button class="btn btn-secondary my-1 button-choice custom-pink-btn" value="${choice}">${myQuestions[currentQuestion].answers[choice]}</button>`);
    }

    // Output questions & choices on screen as text & buttons
    questionsElement.innerHTML = output.join("");
    choicesElement.innerHTML = answers.join("");

    buttonListeners("active");

}

function startTimer() {
    // Sets Timer
    timer = setInterval(function () {
        timerCount--;

        //Output current time to screen
        timerElement.textContent = timerCount;

        if (timerCount >= 0) {
            // Tests if win condition is met
            if ((qIndex === qLimit) && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                endGame();
            }
        }
        // Tests if time has run out
        if (timerCount < 0) {
            // Clears interval
            clearInterval(timer);
            timerCount = 0;
            timerElement.textContent = timerCount;
            endGame();
        }
    }, 1000);
}

function buttonListeners(action) {
    // Function that listens for player choice and also disables choice buttons when not enabled.

    buttons = document.querySelectorAll("button.button-choice");

    if (action == "active") {
        buttons.forEach(button => {
            // Calls checkAnswer() when a choice is selected.
            button.addEventListener("click", checkAnswer);
        });
    }
    if (action == "disable") {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }
}

function checkAnswer() {
    // Checks if guess is the correct answer

    if (this.value == myQuestions[qIndex].correctAnswer) {
        // Increment correct answer count
        correct++;
    } else {
        // Take 5 seconds off the clock on wrong answer
        timerCount -= 5;
    }

    // Increment question index
    qIndex++;
    if (qIndex < qLimit) {
        // Continue game if we have questions left
        displayQuestion(qIndex);
    } else {
        // End game if we have finished questions
        endGame();
    }
}

function endGame() {
    // End of game functions

    // Hide questions section & disable choice buttons
    questionsSection.setAttribute("style", "display:none;");
    buttonListeners("disable");

    // Show high scores section & enable Player name input
    highScoresElement.setAttribute("style", "display:block;");
    userInput.disabled = false;
    submitButton.disabled = false;

    // Enable Play Again button
    startButton.setAttribute("style", "display:inline")
    startButton.innerText = "Play Again?";
    startButton.disabled = false;

}

function submitScore() {
    var userText = userInput.value.trim();

    if (userText === "") {
        return;
    }

    var storedUsers = JSON.parse(localStorage.getItem("users"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedUsers !== null) {
        users = storedUsers;
        scores = storedScores;
    }

    users.push(userText);
    scores.push(timerCount);

    submitButton.disabled = true;
    renderScores();
    setScore();
}

function setScore() {
    // Adds player name and score to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("scores", JSON.stringify(scores));

    userInput.disabled = true;
}

function clearScores() {
    // Clears player names & scores

    users = [];
    scores = [];
    localStorage.removeItem("users");
    localStorage.removeItem("scores");
    renderScores();
}

// Main game
function playGame() {

    startGame();

}

//Initialise game on page load
initGame();

// Event listener for start button
startButton.addEventListener("click", playGame);
submitButton.addEventListener("click", submitScore);
clearButton.addEventListener("click", clearScores);

// Player name input form
userForm.addEventListener("submit", function (event) {
    event.preventDefault();
    submitScore();
});