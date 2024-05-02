const questions = [
    {
      question: "Who made Facebook?",
      options: ["Mark Zuckerberg", "Steve Jobs", "Bill Gates", "Tim Cook"],
      answer: "Mark Zuckerberg"
    },
    {
      question: "Who made YouTube?",
      options: ["Bill Gates", "Jawed Karim", "Markus Persson", "Susan Wojcicki"],
      answer: "Jawed Karim"
    },
    {
      question: "Who invented iPhone?",
      options: ["Tom Anderson", "Tim Cook", "Sam Altman", "Steve Jobs"],
      answer: "Steve Jobs"
    },
    {
      question: "Who made Twitter?",
      options: ["Bill Gates", "Jack Dorsey", "Elon Musk", "Sam Altman"],
      answer: "Jack Dorsey"
    },
    {
      question: "Who made Tesla?",
      options: ["Jack Ma", "Sundar Pichai", "Elon Musk", "Jeff Bezos"],
      answer: "Elon Musk"
    }
  ];

  let currentQuestion = 0;
  let score = 0; 
  let timeLeft = 10; 

  function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      timeLeft = 10; 
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const resultElement = document.getElementById('result');
  const nextButton = document.getElementById('nextBtn');
  const timerElement = document.getElementById('timer');
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = '';
    q.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('btn');
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  
    
    startTimer();
  }

  function startQuiz() {
    window.location.href = "quiz.html";
  }
  
  
  let countdown; 

  function startTimer() {
    clearInterval(countdown);
    timeLeft = 10; 
    timerElement.textContent = timeLeft;
    countdown = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdown);
        checkAnswer(null);
      }
    }, 1000);
  }
  
  function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      timeLeft = 10;
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {

  window.location.href = `results.html?score=${score}`;
  }
  
  nextButton.addEventListener('click', loadQuestion);
  
  loadQuestion();