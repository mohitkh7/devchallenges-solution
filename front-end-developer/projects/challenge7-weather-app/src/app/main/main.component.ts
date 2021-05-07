import { Component, OnInit } from '@angular/core';
import { TemperatureService, TemperatureUnit } from '../temperature/temperature.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  TemperatureUnit = TemperatureUnit;
  tempUnit = TemperatureUnit.CELSIUS;

  constructor(private tempSrv: TemperatureService) {}

  ngOnInit(): void {
    this.tempSrv.getTemperatureUnit().subscribe((unit) => {
      this.tempUnit = unit;
    });
  }

  changeTemperatureUnit(unit: TemperatureUnit): void {
    this.tempSrv.setTemperatureUnit(unit);
  }

}
