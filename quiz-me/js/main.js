var questions = [
  { 
    img: './img/quiz-content/103.png', 
    txt: 'The biceps and brachialis muscles synergize to flex the elbow',
    responses: [
      { txt: "True",  correct: true  },
      { txt: "False", correct: false }
    ]
  }
];

var container = document.getElementById("quiz");

function clearChildren(target) {
  while (target.firstChild)
    target.removeChild(target.firstChild);
}

function checkAnswer() {
  console.log(this, this.correct);
}

function renderQuestion(question) {
  clearChildren(container);

  var img = document.createElement("IMG");
  img.src = question.img

  var txt = document.createElement("DIV");
  txt.innerHTML = question.txt;


  var choices = document.createElement("DIV");
  question.responses.forEach(function(response) {
    var choice = document.createElement("INPUT");
    choice.type    = "button";
    choice.value   = response.txt;
    choice.correct = response.correct;
    choice.onclick = checkAnswer;
    choices.appendChild(choice);
  });


  container.appendChild(img);
  container.appendChild(txt);
  container.appendChild(choices);

}
renderQuestion(questions[0]);
