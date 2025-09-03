const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const optionsContainer = document.getElementById("options-container");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;

// Quiz Questions
const questions = [
  {
    question: "What does 'JS' stand for?",
    options: ["JavaStyle", "JavaScript", "JustScript", "JumboScript"],
    answer: 1,
    image: "" // removed image for Q1
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Netscape_logo.svg"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 0,
    image: "https://www.freeiconspng.com/uploads/comment-png-8.png"
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    answer: 3,
    image: "https://static-00.iconduck.com/assets.00/data-type-icon-512x512-7cdwbz0o.png"
  },
  {
    question: "Which HTML tag is used to include JavaScript?",
    options: ["<javascript>", "<script>", "<js>", "<code>"],
    answer: 1,
    image: "https://cdn-icons-png.flaticon.com/512/174/174854.png"
  }
];

startBtn.addEventListener("click", () => {
  welcomeScreen.classList.remove("active");
  quizScreen.classList.add("active");
  startQuiz();
});

restartBtn.addEventListener("click", () => {
  resultScreen.classList.remove("active");
  welcomeScreen.classList.add("active");
  currentQuestionIndex = 0;
  score = 0;
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionText.textContent = current.question;

  if (current.image) {
    questionImage.src = current.image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(index, current.answer, btn));
    optionsContainer.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  optionsContainer.innerHTML = "";
}

function selectAnswer(selectedIndex, correctIndex, btn) {
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((b, i) => {
    if (i === correctIndex) {
      b.classList.add("correct");
    }
    if (i === selectedIndex && selectedIndex !== correctIndex) {
      b.classList.add("wrong");
    }
    b.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    score++;
  }
  nextBtn.classList.remove("hidden");
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}
