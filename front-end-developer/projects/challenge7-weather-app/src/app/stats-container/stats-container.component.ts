import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.css']
})
export class StatsContainerComponent implements OnInit {
  weather: any = {};
  isInitialState = true;
  isLoading = false;

  constructor(
    private weatherSrv: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherSrv.getWeatherData().subscribe((data) => {
      this.isInitialState = false;
      if (data) {
        this.isLoading = false;
        this.weather = data.consolidated_weather[0];
      } else {
        this.isLoading = true;
      }
    });
  }

}
