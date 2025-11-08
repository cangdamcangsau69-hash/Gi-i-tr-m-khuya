const questions = [
  { q: "2, 4, 8, 16, ... Số tiếp theo là?", a: ["18", "24", "32", "64"], c: 2 },
  { q: "1, 1, 2, 3, 5, 8, ... Tiếp theo?", a: ["11", "12", "13", "14"], c: 2 },
  { q: "5, 10, 20, 40, ... Tiếp theo?", a: ["60", "70", "80", "90"], c: 2 },
  { q: "3, 6, 9, 12, ... Tiếp theo?", a: ["13", "14", "15", "16"], c: 2 },
  { q: "9, 7, 5, 3, ... Tiếp theo?", a: ["2", "1", "0", "-1"], c: 1 },
  { q: "1, 4, 9, 16, ... Tiếp theo?", a: ["20", "25", "30", "36"], c: 1 },
  { q: "1, 2, 4, 7, 11, 16, ... Tiếp theo?", a: ["20", "21", "22", "23"], c: 2 },
  { q: "2, 3, 5, 8, 12, ... Tiếp theo?", a: ["15", "16", "17", "18"], c: 2 },
  { q: "10, 20, 30, 50, 80, ... Tiếp theo?", a: ["100", "110", "120", "130"], c: 1 },
  { q: "7, 14, 28, 56, ... Tiếp theo?", a: ["84", "100", "112", "120"], c: 2 },
];

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const levelSpan = document.getElementById("level");
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

let current = 0;
let score = 0;
let level = 1;

function loadQuestion() {
  const q = questions[current];
  questionText.textContent = q.q;
  answersDiv.innerHTML = "";
  resultDiv.textContent = "";
  nextBtn.style.display = "none";

  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.className = "answer-btn";
    btn.onclick = () => checkAnswer(i);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  const q = questions[current];
  if (index === q.c) {
    score++;
    showConfetti();
    soundCorrect.play();
    const compliments = ["Xuất sắc!", "Tuyệt đỉnh luôn!", "Bạn giỏi quá!", "Chuẩn không cần chỉnh!"];
    resultDiv.textContent = compliments[Math.floor(Math.random() * compliments.length)];
    resultDiv.className = "result correct";
  } else {
    soundWrong.play();
    resultDiv.textContent = "Sai rồi, thử lại nhé 😅";
    resultDiv.className = "result wrong";
    document.body.style.animation = "shake 0.3s";
    setTimeout(() => (document.body.style.animation = ""), 300);
    return;
  }

  nextBtn.style.display = "inline-block";
  if (score % 3 === 0) levelUp();
}

function showConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function levelUp() {
  level++;
  levelSpan.textContent = level;
  document.body.style.background = getRandomGradient();
}

function getRandomGradient() {
  const colors = [
    "linear-gradient(135deg,#ffd6a5,#ffb347)",
    "linear-gradient(135deg,#ffecd2,#fcb69f)",
    "linear-gradient(135deg,#fff6b7,#f6416c)",
    "linear-gradient(135deg,#f9d976,#f39f86)"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

nextBtn.onclick = () => {
  current++;
  if (current >= questions.length) {
    questionText.textContent = "🎉 Hoàn thành thử thách! Bạn thật xuất sắc! 🎉";
    answersDiv.innerHTML = "";
    nextBtn.style.display = "none";
    return;
  }
  loadQuestion();
};

loadQuestion();
