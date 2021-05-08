import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  correctAnswerCount = 0;
  displayMode: 'QUIZ' | 'RESULT' = 'QUIZ';

  showResult(correctAnswerCount: number): void {
    this.correctAnswerCount = correctAnswerCount;
    this.displayMode = 'RESULT';
  }

  startQuiz(): void {
    this.correctAnswerCount = 0;
    this.displayMode = 'QUIZ';
  }
}
