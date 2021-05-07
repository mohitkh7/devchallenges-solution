import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private temperatureUnitSubject$ = new BehaviorSubject<TemperatureUnit>(TemperatureUnit.CELSIUS);

  constructor() { }

  setTemperatureUnit(unit: TemperatureUnit): void {
    this.temperatureUnitSubject$.next(unit);
  }

  getTemperatureUnit(): Observable<TemperatureUnit> {
    return this.temperatureUnitSubject$;
  }
}

export enum TemperatureUnit {
  CELSIUS = 'C',
  FAHRENHEIT = 'F'
}
