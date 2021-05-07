import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-side-location',
  templateUrl: './side-location.component.html',
  styleUrls: ['./side-location.component.css']
})
export class SideLocationComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  query = '';
  locationOptions: any[] = [];
  error: any;
  isInitialState = true;
  isLoading = false;

  constructor(
    private locationSrv: LocationService,
    private weatherSrv: WeatherService
  ) {}

  ngOnInit(): void {
    this.watchGPSPositions();
  }

  onClose(): void {
    this.closeEvent.emit();
  }

  watchGPSPositions(): void {
    this.locationSrv.gpsPositionOptions$.subscribe((data: any) => {
      this.locationOptions = data;
    }, error => {
      console.error(error);
      this.error = error;
    });
  }

  onSearch(): void {
    this.isLoading = true;
    this.error = null;
    this.locationOptions = [];
    this.locationSrv.searchLocation(this.query).subscribe(data => {
      this.isLoading = false;
      this.locationOptions = data;
      if (this.locationOptions.length === 0) {
        this.error = {message: 'No location found for given query'};
      }
    }, error => {
      this.isLoading = false;
      console.error(error);
      this.error = error;
    });
  }

  onSelect(option: any): void {
    this.weatherSrv.fetchWeatherData(option.woeid);
    this.onClose();
  }
}
