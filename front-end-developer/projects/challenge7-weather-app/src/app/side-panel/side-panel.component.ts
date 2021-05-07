import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  isLocationInputHidden = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePanel(): void {
    this.isLocationInputHidden = !this.isLocationInputHidden;
  }

}
