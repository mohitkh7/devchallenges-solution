import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() error = false;
  @Input() helperText = '';
  @Input() startIcon = '';
  @Input() endIcon = '';
  @Input() size: ''|'sm'|'md' = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() multiline = false;
  @Input() row = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
