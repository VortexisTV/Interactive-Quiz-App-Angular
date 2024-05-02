import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [
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

  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 10;
  countdown: any;

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loadQuestion();
    this.startTimer();
  }

  loadQuestion(): void {
    this.timeLeft = 10;
  }

  startQuiz(): void {
    this.router.navigate(['/quiz']);
  }

  startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.countdown = setInterval(() => {
        this.ngZone.run(() => {
          this.timeLeft--;
          if (this.timeLeft <= 0) {
            clearInterval(this.countdown);
            this.checkAnswer(null);
          }
        });
      }, 1000);
    });
  }

  checkAnswer(selectedAnswer: string | null): void {
    const correctAnswer = this.questions[this.currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.showResult();
    }
  }

  showResult(): void {
    this.router.navigate(['/results'], { queryParams: { score: this.score } });
  }
}