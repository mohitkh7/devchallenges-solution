import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() correctAnswerCount!: number;
  @Output() startQuiz = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  tryAgain(): void {
    this.startQuiz.emit();
  }

}
