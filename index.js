let intro_container = document.querySelector(".intro-container");
let question_container = document.querySelector(".question-container");
let start_button = document.querySelector(".start-button");

start_button.addEventListener("click", start_quiz);

let questions;
fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data.questions;
  });

let correct_answers = 0;
let current_question = 0;
let current_question_correct; // змінна, яка зберігає поточну правильну відповідь
let hp = 3;

let logo = document.querySelector(".logo");
logo.addEventListener("click", function () {
  intro_container.style.display = "flex";
  question_container.style.display = "none";
  results_container.style.display = "none";
});

let heart_counter = document.querySelector(".heart-counter");
let question_text = document.querySelector(".question-text");
let time_counter = document.querySelector(".timer-counter");
let cards = document.querySelectorAll(".card");
let cards_counter = document.querySelector(".cards-counter");
let correct_counter = document.querySelector(".correct-counter");
let results_container = document.querySelector(".results-container");
let restart_btn = document.querySelector(".restart-button");

let timerId;

function start_quiz() {
  clearInterval(timerId);
  correct_answers = 0;
  current_question = 0;
  hp = 3;

  intro_container.style.display = "none";
  results_container.style.display = "none";
  question_container.style.display = "flex";
  heart_counter.innerHTML = 3;
  question_text.innerHTML = questions[current_question].word;
  cards_counter.innerHTML = questions.length;
  time_counter.innerHTML = 0;
  correct_counter.innerHTML = 0;
  for (let i = 0; i < 3; i++) {
    if (questions[current_question].options[i].correct) {
      current_question_correct = questions[current_question].options[i].text;
    }
  }
  for (let i = 0; i < 3; i++) {
    cards[i].querySelector(".card-text").innerHTML =
      questions[current_question].options[i].text;
    cards[i].querySelector(".card-image").src =
      questions[current_question].options[i].image_url;
  }
  timerId = setInterval(function () {
    time_counter.innerHTML = +time_counter.innerHTML + 1;
  }, 1000);
}

for (let i = 0; i < 3; i++) {
  cards[i].addEventListener("click", function () {
    cards_counter.innerHTML = +cards_counter.innerHTML - 1;
    if (
      cards[i].querySelector(".card-text").innerHTML == current_question_correct
    ) {
      correct_answers++;
      correct_counter.innerHTML = correct_answers;
    } else {
      hp--;
      heart_counter.innerHTML = hp;
    }
    if (current_question >= questions.length - 1 || hp <= 0) {
      question_container.style.display = "none";
      setResults();
      results_container.style.display = "flex";
    }
    current_question++;
    for (let i = 0; i < 3; i++) {
      if (questions[current_question].options[i].correct) {
        current_question_correct = questions[current_question].options[i].text;
      }
    }
    question_text.innerHTML = questions[current_question].word;
    for (let i = 0; i < 3; i++) {
      cards[i].querySelector(".card-text").innerHTML =
        questions[current_question].options[i].text;
      cards[i].querySelector(".card-image").src =
        questions[current_question].options[i].image_url;
    }
  });
}

restart_btn.addEventListener("click", function () {
  start_quiz();
});

let total = document.querySelector("#total");
let correct = document.querySelector("#correct");
let time = document.querySelector("#time");
let result = document.querySelector("#result");

function setResults() {
  total.innerHTML = questions.length;
  correct.innerHTML = correct_answers;
  time.innerHTML = time_counter.innerHTML;
  let percent = Math.round((correct_answers / questions.length) * 100);
  if (percent > 70) {
    result.innerHTML = "Відмінний";
    result.style.color = "green";
  } else if (percent > 40) {
    result.innerHTML = "Задовільний";
    result.style.color = "orange";
  } else {
    result.innerHTML = "Незадовільний";
    result.style.color = "red";
  }
}
// пофіксити баги з перезапуском
// додати екран з результатом
// додати можливість вибору мову перед початком тесту
// зробити квіз адаптивним
