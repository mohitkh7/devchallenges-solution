import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly CORS_PROXY_URL = 'https://api.allorigins.win/get?url=';
  readonly API_PROVIDER_URL = 'https://www.metaweather.com/api/';
  weatherSubject$ = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  fetchWeatherData(woeid: number): void {
    const url = this.CORS_PROXY_URL + this.API_PROVIDER_URL + 'location/' + woeid;
    this.weatherSubject$.next(null);
    this.http.get(url).subscribe((data: any) => {
      this.weatherSubject$.next(JSON.parse(data.contents));
    });
  }

  getWeatherData(): Observable<any> {
    return this.weatherSubject$;
  }
}
