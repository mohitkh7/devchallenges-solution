import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIconComponent implements OnInit {
  @Input() state: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getPath(): string {
    // remove spaces to get image name
    const imgName = this.state?.replace(/\s+/g, '');
    return 'assets/' + imgName + '.png';
  }

}
