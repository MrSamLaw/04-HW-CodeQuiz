// Element Selectors
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var clearButton = document.querySelector(".button-clear");
var myBtn = document.querySelectorAll("#myBtn");
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

var users = [];
var scores = [];

const myQuestions = [
    { question: "Which one is true?", answers: { 1: "False", 2: "False", 3: "True", 4: "False" }, correctAnswer: "3" },
    { question: "Which one is false?", answers: { 1: "False", 2: "True", 3: "True", 4: "True" }, correctAnswer: "2" },
    { question: "Which one is true?", answers: { 1: "False", 2: "False", 3: "True", 4: "False" }, correctAnswer: "3" }
];

// Functions
function initGame() {
    getScore();
    renderScores();

    console.log("Initiate Game");
    qLimit = myQuestions.length;
    qIndex = 0;

}

function startGame() {
    highScoresElement.setAttribute("style", "display:none;");
    timerCount = 50;
    startButton.disabled = true;
    displayQuestion(qIndex);
    startTimer();
}

function buttonListeners(action) {
    buttons = document.querySelectorAll("button.button-choice");
    console.log(action);
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
        answers.push(`<button class="button-choice" value="${choice}">${myQuestions[currentQuestion].answers[choice]}</button>`);
    }

    output.push(
        `<div class="question"> ${myQuestions[currentQuestion].question} </div>`
    );

    questionsElement.innerHTML = output.join("");
    choicesElement.innerHTML = answers.join("");
    buttonListeners("active");

}

function endGame() {
    buttonListeners("disable");
    highScoresElement.setAttribute("style", "display:block;");
    userInput.disabled = false;
    // inputScore();

    console.log("THE GAME HAS ENDED!!!!");
    startButton.innerText = "Play Again?";
    startButton.disabled = false;

}

function checkAnswer() {
    console.log(this.value);
    // console.log(typeOf(this.value));
    console.log("The correct answer should be " + myQuestions[qIndex].correctAnswer);
    // console.log(typeOf(myQuestions[qIndex].correctAnswer));
    // Checks if guess is the correct answer
    if (this.value == myQuestions[qIndex].correctAnswer) {
        console.log("Correct Answer!!");
    } else {
        timerCount -= 5;
        console.log("Wrong Answer!!");
    }
    console.log("Current Q: " + qIndex);
    console.log("Last Q: " + qLimit);
    if (qIndex <= qLimit) {
        displayQuestion(qIndex);
        qIndex++;
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

// function inputScore() {
//     userForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         console.log("Entered")

//         var userText = userInput.value.trim();

//         if (userText === "") {
//             console.log("Error")
//             return;
//         }

//         var storedUsers = JSON.parse(localStorage.getItem("users"));
//         var storedScores = JSON.parse(localStorage.getItem("scores"));

//         if (storedUsers !== null) {
//             users = storedUsers;
//             scores = storedScores;
//         }

//         // get local storage array OR assign to new array
//         // var usersFromStorage = localStorage.getItem("users") || [];
//         // var scoreFromStorage = localStorage.getItem("scores") || [];

//         users.push(userText);
//         scores.push(timerCount);
//         // usersFromStorage.push(userText);
//         // scoreFromStorage.push(timerCount);

//         setScore();

//     });
// }

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
