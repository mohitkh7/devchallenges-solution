import { Component, Input, OnInit } from '@angular/core';
import { TemperatureService, TemperatureUnit } from '../temperature/temperature.service';

@Component({
  selector: 'app-future-detail',
  templateUrl: './future-detail.component.html',
  styleUrls: ['./future-detail.component.css']
})
export class FutureDetailComponent implements OnInit {
  @Input() weather: any;
  tempUnit = TemperatureUnit.CELSIUS;

  constructor(private tempSrv: TemperatureService) { }

  ngOnInit(): void {
    this.tempSrv.getTemperatureUnit().subscribe((unit) => {
      this.changeTempUnit(unit);
    });
  }

  changeTempUnit(unit: TemperatureUnit): void {
    this.tempUnit = unit;
  }
}
