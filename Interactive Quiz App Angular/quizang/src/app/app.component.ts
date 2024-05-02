import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizang';
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
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

let currentQuestion: number = 0;
let score: number = 0;
let timeLeft: number = 10;

function checkAnswer(selectedAnswer: string | null): void {
  const correctAnswer: string = questions[currentQuestion].answer;
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

const questionElement: HTMLElement | null = document.getElementById('question');
const optionsElement: HTMLElement | null = document.getElementById('options');
const resultElement: HTMLElement | null = document.getElementById('result');
const nextButton: HTMLElement | null = document.getElementById('nextBtn');
const timerElement: HTMLElement | null = document.getElementById('timer');

function loadQuestion(): void {
  const q: Question = questions[currentQuestion];
  if (questionElement) questionElement.textContent = q.question;
  if (optionsElement) optionsElement.innerHTML = '';
  q.options.forEach(option => {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = option;
    button.classList.add('btn');
    button.addEventListener('click', () => checkAnswer(option));
    if (optionsElement) optionsElement.appendChild(button);
  });


  startTimer();
}

function startQuiz(): void {
  window.location.href = "quiz.html";
}

let countdown: number; 

function startTimer(): void {
  clearInterval(countdown);
  timeLeft = 10;
  if (timerElement) timerElement.textContent = timeLeft.toString();
  countdown = window.setInterval(() => {
    timeLeft--;
    if (timerElement) timerElement.textContent = timeLeft.toString();
    if (timeLeft <= 0) {
      clearInterval(countdown);
      checkAnswer(null);
    }
  }, 1000);
}

function showResult(this: any): void {
  this.router.navigate(['/results'], { queryParams: { score: this.score } });
}


if (nextButton) nextButton.addEventListener('click', loadQuestion);

loadQuestion();
