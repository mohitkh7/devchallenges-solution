import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  
  @Input() color = 'default';
  @Input() size = 'md';
  @Input() variant: any = '';
  @Input() disableShadow = false;
  @Input() disabled = false;
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
