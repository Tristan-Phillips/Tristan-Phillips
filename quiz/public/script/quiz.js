class Quiz {
  constructor() {
    this.questions = [];
    this.usedIndices = new Set();
    this.currentQuestion = null;
    this.totalAnswered = 0;
    this.maxQuestions = 0;
    this.isPaused = false;
    this.timeLeft = 30;
    this.timer = null;
    this.autoNextTimer = null;
    this.currentAudio = null;
    this.isAnswerShown = false;
    this.autoplay = true;
    this.timePerRound = 30;
    this.localization = {};

    // Get quiz path from current URL
    const quizPath = window.location.pathname.split('/quiz.html')[0];
    this.basePath = `${quizPath}/public`;
    const pathSegments = quizPath.split('/').filter(seg => seg);
    this.topic = pathSegments[pathSegments.length - 1];

    // Bind event handlers
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.init();
  }

  async init() {
    try {
      document.getElementById("loading").style.display = "flex";
      await Promise.all([this.loadLocalization(), this.loadQuestions()]);
      this.setupEventListeners();
      this.updateLocalizedElements();
      document.getElementById("loading").style.display = "none";
      document.getElementById("source-link").style.display = "none";
    } catch (error) {
      console.error("Initialization Error:", error);
      document.getElementById("loading").innerHTML = `
        <p style="color: #cc0000">${error.message}</p>
        <button onclick="location.reload()">Reload Page</button>
      `;
    }
  }

  async loadLocalization() {
    const response = await fetch('/quiz/public/localization/en.json');
    if (!response.ok) throw new Error("Failed to load translations");
    this.localization = await response.json();
  }

  async loadQuestions() {
    const response = await fetch(`${this.basePath}/data/questions.json`);
    if (!response.ok) throw new Error("Failed to load questions");
    this.questions = await response.json();
  }

  setupEventListeners() {
    document.getElementById("start-btn").addEventListener("click", () => this.startQuiz());
    document.getElementById("reveal-btn").addEventListener("click", () => this.showAnswer());
    document.getElementById("next-btn").addEventListener("click", () => this.nextQuestion(false));
    document.getElementById("pause-btn").addEventListener("click", () => this.togglePause());
    document.getElementById("restart-btn").addEventListener("click", () => location.reload());
    document.getElementById("autoplay-checkbox").addEventListener("change", (e) => {
      this.autoplay = e.target.checked;
    });
    document.addEventListener("keydown", this.handleKeyPress);
  }

  updateLocalizedElements() {
    document.title = this.localize('textDefaults.titleText', 'Quiz');

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.localize(key);
      if (text) element.textContent = text;
    });

    const quizTitleKey = `quizzes.${this.topic}.title`;
    const quizTitle = this.localize(quizTitleKey, 
      `${this.topic.toUpperCase()}`);

    document.querySelectorAll('.quiz-title').forEach(el => {
      el.textContent = quizTitle;
    });
  }

  localize(key, fallback = '') {
    return key.split('.').reduce((o,i) => o?.[i], this.localization) || fallback;
  }

  startQuiz() {
    this.usedIndices.clear();
    this.totalAnswered = 0;
    this.maxQuestions = parseInt(document.getElementById("question-limit").value) || Infinity;

    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    document.getElementById("restart-btn").classList.remove("hidden");

    ["reveal-btn", "pause-btn"].forEach(id => {
      document.getElementById(id).disabled = false;
    });

    this.nextQuestion(true);
  }

  nextQuestion(initial = false) {
    if (this.totalAnswered >= this.maxQuestions) return this.endQuiz();
    if (!initial) this.stopAudio();

    clearInterval(this.timer);
    clearTimeout(this.autoNextTimer);
    this.isAnswerShown = false;

    this.currentQuestion = this.getRandomQuestion();
    this.totalAnswered++;

    this.updateDisplay();
    this.startTimer();
    this.playQuestionAudio();
  }

  getRandomQuestion() {
    const available = this.questions.filter((_, i) => !this.usedIndices.has(i));
    if (available.length === 0) {
      this.usedIndices.clear();
      return this.getRandomQuestion();
    }

    const question = available[Math.floor(Math.random() * available.length)];
    this.usedIndices.add(this.questions.indexOf(question));
    return question;
  }

  updateDisplay() {
    document.getElementById("question-text").textContent = this.currentQuestion.question;
    document.getElementById("current-count").textContent = this.totalAnswered;
    document.getElementById("total-questions").textContent = 
      this.maxQuestions === Infinity ? "/ ∞" : `/ ${this.maxQuestions}`;
    document.getElementById("answer-box").classList.add("hidden");
    document.getElementById("source-link").style.display = "none";
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("reveal-btn").classList.remove("hidden");
    document.getElementById("answer-text").textContent = "";
  }

  startTimer() {
    this.timeLeft = this.timePerRound;
    document.getElementById("timer-bar").style.width = "100%";

    this.timer = setInterval(() => {
      if (this.isPaused) return;
      this.timeLeft--;
      document.getElementById("timer-bar").style.width = 
        `${(this.timeLeft / this.timePerRound) * 100}%`;
      if (this.timeLeft <= 0) this.showAnswer(true);
    }, 1000);
  }

  showAnswer(autoTriggered = false) {
    if (this.isAnswerShown) return;
    this.isAnswerShown = true;

    clearInterval(this.timer);
    this.stopAudio();

    document.getElementById("answer-text").textContent = this.currentQuestion.answer;
    const sourceLink = document.getElementById("source-link");

    // Source link handling
    const validSource = this.currentQuestion.source &&
                      this.currentQuestion.source !== "#" &&
                      this.currentQuestion.source !== "";

    sourceLink.href = validSource ? this.currentQuestion.source : "#";
    sourceLink.style.display = validSource ? "inline-block" : "none";

    document.getElementById("answer-box").classList.remove("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
    document.getElementById("reveal-btn").classList.add("hidden");
    this.playAnswerAudio();

    if (this.autoplay && autoTriggered) {
      this.autoNextTimer = setTimeout(() => this.nextQuestion(), 5000);
    }
  }

  playQuestionAudio() {
    this.stopAudio();
    if (this.currentQuestion.audio) {
      this.currentAudio = new Audio(
        `${this.basePath}/audio/questions/${this.currentQuestion.audio}`
      );
      this.currentAudio.play().catch(console.error);
    }
  }

  playAnswerAudio() {
    this.stopAudio();
    if (this.currentQuestion.answerAudio) {
      this.currentAudio = new Audio(
        `${this.basePath}/audio/answers/${this.currentQuestion.answerAudio}`
      );
      this.currentAudio.play().catch(console.error);
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById("pause-btn");
    pauseBtn.textContent = this.isPaused ? "▶ Resume" : "⏸ Pause";

    if (this.isPaused) {
      this.stopAudio();
      clearInterval(this.timer);
    } else {
      this.currentAudio?.play();
      this.startTimer();
    }
  }

  handleKeyPress(event) {
    if (event.code === "Space" && !this.isAnswerShown) {
      this.showAnswer();
    }
    if (event.code === "ArrowRight" && this.isAnswerShown) {
      this.nextQuestion();
    }
  }

  endQuiz() {
    this.stopAudio();
    alert(`Quiz Complete! Answered ${this.totalAnswered} questions.`);
    location.reload();
  }

  destructor() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
}

// Initialize and cleanup
const quiz = new Quiz();
window.addEventListener("beforeunload", () => quiz.destructor());