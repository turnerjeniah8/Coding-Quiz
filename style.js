var timerEl = document.querySelector(".timer") ;
var clickStart= document.querySelector("#startBtn");
var questionContainer = document.getElementById("question-container");
var questionsbox = document.querySelector(".questions-box");
var questionTitle = document.querySelector("#questions");
var questionChoice = document.querySelectorAll(".answer");
var leaderboard = document.querySelector(".scores");
var nameInput = document.querySelector("#name");
var main = document.getElementById("main-content");
var quizStart = document.getElementById("startBtn");

var timeLeft = 60
var quizDuration;

function time(){
  timerEl.textContent =  "Time remaining:" + timeLeft;
  quizDuration = setInterval(function(){
    if (timeLeft > 0){
      adjustTime(0);
    }
    else{
      endQuiz();
    }
  }, 1000);
}


function adjustTime(amount){
  timeLeft += amount;
  if (timeLeft < 0){
    timeLeft = 0;
  }
  timeLeft.textContent = "Oh No You ran out of time!"
}


quizStart.onclick = time();
var createQuestion = function (questionsArray){
  questionContainer.innerHTML = "";

  var questionTitle = document.createElement("h2");
  questionTitle.textcontent = questionsArray.question;

  var answerA = document.createElement("button");
  answerA.textContent = questionsArray.a;
  answerA.addEventListener("click", userPick);

  var answerB = document.createElement("button");
  answerB.textContent=questionsArray.b;
  answerB.addEventListener("click", userPick);

  var answerC = document.createElement("button");
  answerC.textContent = questionsArray.c;
  answerC.addEventListener("click", userPick)

  var answerD = document.createElement("button");
  answerD.textContent = questionsArray.d;
  answerD.addEventListener("click", userPick);

  questionContainer.appendChild(questionTitle);
  questionContainer.appendChild(answerA);
  questionContainer.appendChild(answerB);
  questionContainer.appendChild(answerC);
  questionContainer.appendChild(answerD);
}

// Questions that ive created
  var questionsArray = [{
    question: "What does .getitem do?",
      a: "retrieves data" , 
      b: "retrieve object" ,
      c: "retrieve string" , 
      d: "retrieves nothing", 
    
    answer: "retrieves data",
  },
  {
    question: "What does parse do?",
    a: "undos the stringify" , 
    b: "both A and D" ,  
    c: "puts array as a string" ,
    d: "Converts the storage back to javascript" ,
  answer: "both A and D",
   
      },
    {
    question: "What does concat do?",
      a: "deletes the array" ,
      b: "joins two arrays into one" , 
      c: "puts the array into a string" , 
      d: "both a and c" ,  
      answer: "joins two arrays into one"
     },
    ];

var currentQuestionIndex = 0;
var score = 0;
var correctChoice = questionsArray[currentQuestionIndex].answer;
var clickLeaderboard = document.getElementById("leaderboard")

var userPick = function(event){
  event.preventDefault();
  var userAnswer = event.target.textContent;
  correctChoice = questionsArray[currentQuestionIndex].correct;
  var checkAnswer = document.querySelector('#checkAnswer');
  if (userAnswer !== correctChoice) {
    adjustTime(-5);
    checkAnswer.textContent = "Incorrect";
    currentQuestionIndex++;
    if (currentQuestionIndex >= questionsArray.length){
      endQuiz();
    }
    else{
      createQuestion(questionsArray[currentQuestionIndex])
    };
  }
  else if (userAnswer === correctChoice){
    currentQuestionIndex++;
    checkAnswer.textContent = "Correct";
    score++;
    if (currentQuestionIndex >= questionsArray.length) {
      endQuiz();
    }
    else{
      createQuestion(questionsArray[currentQuestionIndex])
    };
  }
};

var quiz = function (event) {
  event.preventDefault();
  clearPage();
  createQuestion(questionsArray[currentQuestionIndex])
};

//clear page function
function clearPage(){
  questionContainer.innerHTML = "";
  document.querySelector("#mainContent").getElementsByClassName.display = "none";
  
}

//leaderboard function
function leaderboardScores(){
  let data = localStorage.getItem("object");
  let getData = JSON.parse(data);
  let name = getData.nameInput
  let score = getData.score;
  questionContainer.innerHTML = "";
  questionContainer.innerHTML = nameInput + " " + score;
}

leaderboard.addEventListener("click", leaderboardScores);
//end quiz function
function endQuiz(){
  clearPage();
  timerEl.textContent = "";
  clearInterval(quizDuration);
  var quizOver = document.createElement("h1");
  questionContainer.appendChild(quizOver);

  let blank = document.querySelector("#check-answer");
  blank.innerHTML = "";

  quizOver.innerHTML = "Quiz Over! You've Scored" + score + "Type your name to save your score!";

  var nameInput = document.createElement("input");
  blank.appendChild(nameInput);

  var submitName = document.createElement("button");
  submitName.textcontent = "Submit";
  blank.appendChild(submitName);
  
  submitName.addEventListener("click", () => {
    if (nameInput.value.length === 0 )
    return false;

    let storeName = (...input) => {
      let data = JSON.stringify({"name": input[0], "score":input[1]})
      localStorage.setItem("object", data)
    }
    storeName(nameInput.value, score);
  })
};

document.querySelector("input").value = "";
nameInput.addEventListener("submit", endQuiz);
//submitting name function
function finalizeName(){
  submitName.addEventListener("click", function (event){
    event.preventDefault;
  })
};

clickStart.addEventListener("click", quiz);
