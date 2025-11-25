const flashcards = [
  {
    question: "What is 2+2?",
    answer: "The answer is obvoiusly 4",
  },
  {
    question: "Who is the leader of North Korea?",
    answer: "Kim Jung Un",
  },
  {
    question: "Who is the best youtuber?",
    answer: "PewDiePie",
  },
  {
    question: "Where does PewDiePie live?",
    answer: "Japan",
  },
  {
    question: "What is the name of PewDiePies son?",
    answer: "Bjórn",
  },
];

let currentIndex = 0;
let isFlipped = false;

const flashcardElement = document.getElementById("flashcard");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const prevBtn = document.getElementById("prev-btn");
const flipBtn = document.getElementById("flip-btn");
const nextBtn = document.getElementById("next-btn");
const deleteBtn = document.getElementById("delete-btn");

const addForm = document.getElementById("add-form");
const addQuestion = document.getElementById("add-question");
const addAnswer = document.getElementById("add-answer");
const addBtn = document.getElementById("add-btn");

nextBtn.addEventListener("click", function() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        isFlipped = false;
        render();
    }
});

prevBtn.addEventListener("click", function() {
    if (currentIndex > 0) {
        currentIndex--;
        isFlipped = false;
        render();
    }
});

flipBtn.addEventListener("click", function() {
    isFlipped = !isFlipped
    render();
});

deleteBtn.addEventListener("click", function() {
    if (flashcards.length === 0) return;
    flashcards.splice(currentIndex, 1);
    if (currentIndex >= flashcards.length) {
        currentIndex = Math.max(0, flashcards.length - 1);
    }
    isFlipped = false;
    render();
});

addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const q = addQuestion.value.trim();
    const a = addAnswer.value.trim();
    if (!q || !a) return;
    flashcards.push({ question: q, answer: a });
    currentIndex = flashcards.length - 1;
    isFlipped = false;
    addQuestion.value = "";
    addAnswer.value = "";
    render();
})

function renderCard() {
    if (flashcards.length === 0) {
        flashcardElement.textContent = "No cards. Add one below.";
        return;
    }

  const card = flashcards[currentIndex];

  if (isFlipped) {
    flashcardElement.textContent = card.answer;
  } else {
    flashcardElement.textContent = card.question;
  }
}

function renderProgress() {
    const total = flashcards.length;
    if (total === 0) {
        progressBar.style.width = "0%";
        return;
    }
    const percent = ((currentIndex + 1) / total) * 100;

    progressBar.style.width = percent + "%";
    progressText.textContent = `${currentIndex + 1} / ${total}`;
}

function renderControls() {
    const total = flashcards.length;
    prevBtn.disabled = total === 0 || currentIndex <= 0;
    nextBtn.disabled = total === 0 || currentIndex >= total - 1;
    flipBtn.disabled = total === 0;
    deleteBtn.disabled = total === 0;
}

function render() {
    renderCard();
    renderProgress();
    renderControls();
}

render();

