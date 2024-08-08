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
});

let heart_counter = document.querySelector(".heart-counter");
let question_text = document.querySelector(".question-text");
let time_counter = document.querySelector(".timer-counter");
let cards = document.querySelectorAll(".card");
let cards_counter = document.querySelector(".cards-counter");
let correct_counter = document.querySelector(".correct-counter");

function start_quiz() {
  correct_answers = 0;
  current_question = 0;
  hp = 3;

  intro_container.style.display = "none";
  question_container.style.display = "flex";
  question_text.innerHTML = questions[current_question].word;
  cards_counter.innerHTML = questions.length;
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
  setInterval(function () {
    time_counter.innerHTML = +time_counter.innerHTML + 1;
  }, 1000);
}

for (let i = 0; i < 3; i++) {
  cards[i].addEventListener("click", function () {
    cards_counter.innerHTML = +cards_counter.innerHTML - 1;
    if (
      cards[i].querySelector(".card-text").innerHTML == current_question_correct
    ) {
      console.log("Правильно!");
      correct_answers++;
      correct_counter.innerHTML = correct_answers;
    } else {
      console.log("Неправильно!");
      hp--;
      heart_counter.innerHTML = hp;
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

// пофіксити баги з перезапуском
// додати екран з результатом
// додати можливість вибору мову перед початком тесту
// зробити квіз адаптивним
