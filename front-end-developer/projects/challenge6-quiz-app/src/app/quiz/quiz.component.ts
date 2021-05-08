import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionService, Question } from '../question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Output() quizComplete = new EventEmitter<number>();
  readonly LABELS = ['A', 'B', 'C', 'D'];
  question!: Question;
  selectedOption: number | null = null;
  totalQuestionCount!: number;
  currentQuestionCount!: number;
  correctAnswerCount!: number;


  constructor(
    private questionSrv: QuestionService
  ) { }

  ngOnInit(): void {
    this.initCounts();
    this.getQuestion();
  }

  initCounts(): void {
    this.totalQuestionCount = 5;
    this.currentQuestionCount = 0;
    this.correctAnswerCount = 0;
  }

  nextQuestion(): void {
    // show result when all questions are asked
    if (this.currentQuestionCount === this.totalQuestionCount) {
      this.quizComplete.emit(this.correctAnswerCount);
    }
    this.resetState();
    this.getQuestion();
  }

  resetState(): void {
    this.selectedOption = null;
  }

  getQuestion(): void {
    this.questionSrv.getQuestion().then((data) => {
      this.currentQuestionCount++;
      this.question = data;
    });
  }

  /**
   * returns list of css classes applicable to options based on application state
   * @param optionIndex - index of the option starting from 0
   * @returns css classes to be applied
   */
  getClass(optionIndex: number): string {
    let classCSS = '';
    if (this.selectedOption === null) {
      // if no option is selected, all options will be active
      classCSS = 'option--active';
    } else {
      if (optionIndex === this.question.answer) {
        classCSS = 'option--correct';
      } else if (optionIndex === this.selectedOption) {
        classCSS = 'option--wrong';
      } else {
        classCSS = 'option--inactive';
      }
    }
    return classCSS;
  }

  chooseAnswer(optionIndex: number): void {
    if (this.selectedOption === null) {
      this.selectedOption = optionIndex;
      this.updateCorrectAnswerCount();
    }
  }

  updateCorrectAnswerCount(): void {
    if (this.selectedOption === this.question.answer) {
      this.correctAnswerCount++;
    }
  }

}
