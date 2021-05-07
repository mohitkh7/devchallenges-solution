import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs/operators';
import { LocationService } from '../location.service';
import { TemperatureService, TemperatureUnit } from '../temperature/temperature.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-side-detail',
  templateUrl: './side-detail.component.html',
  styleUrls: ['./side-detail.component.css']
})
export class SideDetailComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  tempUnit = TemperatureUnit.CELSIUS;
  weather: WeatherDetail = {};
  isInitialState = true;
  isLoading = false;
  error: GeolocationPositionError | null = null;

  constructor(
    private tempSrv: TemperatureService,
    private weatherSrv: WeatherService,
    private geolocation$: GeolocationService,
    private locationSrv: LocationService
  ) { }

  ngOnInit(): void {
    this.tempSrv.getTemperatureUnit().subscribe((unit) => {
      this.changeTempUnit(unit);
    });
    this.getWeatherData();
  }

  onSearch(): void {
    this.openSideLocationPanel();
  }

  openSideLocationPanel(): void {
    this.closeEvent.emit();
  }

  changeTempUnit(unit: TemperatureUnit): void {
    this.tempUnit = unit;
  }

  getWeatherData(): void {
    this.weatherSrv.getWeatherData().subscribe((data) => {
      this.isInitialState = false;
      this.error = null;
      if (data == null) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
        this.weather = data.consolidated_weather[0];
        this.weather.location = data.title;
      }
    },
    (error) => {
      console.log(error);
      this.error = error;
    });
  }

  onGetGPSLocation(): void {
    this.error = null;
    this.geolocation$.pipe(take(1)).subscribe(position => {
      console.log(position);
      this.locationSrv.searchNearbyPositions(position.coords.latitude, position.coords.longitude);
      this.openSideLocationPanel();
    },
    (error: GeolocationPositionError) => {
      console.error(error);
      this.error = error;
    });
  }

}

interface WeatherDetail {
  'id'?: number;
  'weather_state_name'?: string;
  'weather_state_abbr'?: string;
  'wind_direction_compass'?: string;
  'created'?: string;
  'applicable_date'?: string;
  'min_temp'?: number;
  'max_temp'?: number;
  'the_temp'?: number;
  'wind_speed'?: number;
  'wind_direction'?: number;
  'air_pressure'?: number;
  'humidity'?: number;
  'visibility'?: number;
  'predictability'?: number;
  'location'?: string;
}
