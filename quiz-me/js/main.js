var container = document.getElementById("quiz");
var muscles = [
  undefined,
  "supraspinatus",
  "infraspinatus",
  "teres minor",
  "teres major",
  "triceps (long head)",
  "triceps (short head)",
  "rhomboid minor",
  "rhomboid major",
  "latissimus dorsi",
  "levator scapulae"
];

var askedMuscles = [];

var numCorrect = 0;
var numWrong   = 0;

function checkAnswer() {
  var txt = "";
  if (this.correct) {
    txt += "Nice!\n";
    numCorrect += 1;
  } else {
    txt += "Not Quite.\n(It was " + this.actual + ")\n";
    numWrong += 1;
  }
  txt += "\n";
  txt += "Correct: " + numCorrect + " " + "Incorrect: " + numWrong;

  alert(txt);
  makeQuestion();
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function clearChildren(target) {
  while (target.firstChild)
    target.removeChild(target.firstChild);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function selectWrongMuscle(correctNumber) {
  var possibleChoice = correctNumber;
  while (possibleChoice === correctNumber) {
    possibleChoice = randomIntFromInterval(1, 10);
  }
  return possibleChoice;
}

function generateQuestionFor(muscleNumber) {
  clearChildren(container);

  var imgSrc = "./img/quiz-content/Anatomy/001_m" + muscleNumber + ".png";

  var img          = document.createElement("IMG");
  img.src          = imgSrc;
  img.style.width  = "100%";
  img.style.height = "auto";

  var txt = document.createElement("DIV");
  txt.style.textAlign = "center";
  txt.innerHTML = "Identify the muscle marked with the dot";

  var possibleChoices = [];
  while (possibleChoices.length < 5) {
    var possibleChoice = selectWrongMuscle(muscleNumber);
    if (possibleChoices.indexOf(possibleChoice) === -1) {
      possibleChoices.push(possibleChoice);
    }
  }
  possibleChoices.push(muscleNumber);
  shuffle(possibleChoices);

  var choices = document.createElement("DIV");
  possibleChoices.forEach(function(mN) {
    var choice    = document.createElement("INPUT");
    choice.type    = "button";
    choice.value   = muscles[mN];
    choice.actual  = muscles[muscleNumber];
    choice.correct = mN === muscleNumber;
    choice.onclick = checkAnswer;
    choice.style.width = "100%";
    choice.style.marginTop = "5px";
    choices.appendChild(choice);
    choices.appendChild(document.createElement("BR"));
  });

  container.appendChild(img);
  container.appendChild(txt);
  container.appendChild(choices);
  askedMuscles.push(muscleNumber);
}

function makeQuestion() {
  if (askedMuscles.length === 10) {
    askedMuscles = [];
  }
  var askMuscle = randomIntFromInterval(1, 10);
  while (askedMuscles.indexOf(askMuscle) !== -1) {
    askMuscle = randomIntFromInterval(1, 10);
  }
  generateQuestionFor(askMuscle);
}
makeQuestion();
