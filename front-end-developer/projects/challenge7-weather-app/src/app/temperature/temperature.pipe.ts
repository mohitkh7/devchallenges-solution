import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TemperatureService, TemperatureUnit } from './temperature.service';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,
              private tempSrv: TemperatureService) {}

  transform(temperatureInCelsius: number | undefined, unit: TemperatureUnit, ...args: unknown[]): string {
    let temp = temperatureInCelsius || 0;
    if (unit === TemperatureUnit.FAHRENHEIT) {
      temp = this.convertCToF(temp);
    }
    // displays temperature with atmost one decimal
    return formatNumber(temp, 'en', '1.0-1');
  }

  /**
   * converts temperature from celsius unit to fahrenheit
   * @param temp temperature in celsius unit
   */
  convertCToF(temp: number): number {
    return ((temp * 9) / 5) + 32;
  }

}
