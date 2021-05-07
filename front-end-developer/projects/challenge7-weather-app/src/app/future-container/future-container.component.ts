import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-future-container',
  templateUrl: './future-container.component.html',
  styleUrls: ['./future-container.component.css']
})
export class FutureContainerComponent implements OnInit {
  futureDataArr: any = [];
  constructor(
    private weatherSrv: WeatherService
  ) { }

  ngOnInit(): void {
    this.getFutureWeatherData();
  }

  getFutureWeatherData(): void {
    this.weatherSrv.getWeatherData().subscribe(data => {
      if (data) {
        this.futureDataArr = data.consolidated_weather.slice(1, );
      } else {
        this.futureDataArr = [null, null, null, null, null];
      }
    });
  }

}
