import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly CORS_PROXY_URL = 'https://api.allorigins.win/get?url=';
  readonly API_PROVIDER_URL = 'https://www.metaweather.com/api/';

  gpsPositionOptions$ = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  searchLocation(query: string): Observable<any> {
    const url = this.CORS_PROXY_URL + this.API_PROVIDER_URL + 'location/search/?query=' + query;
    return this.http.get(url).pipe(map((x: any) => JSON.parse(x.contents)));
  }

  searchNearbyPositions(lat: number, long: number): void {
    const url = this.CORS_PROXY_URL + this.API_PROVIDER_URL + 'location/search/?lattlong=' + lat + ',' + long;
    this.http.get(url).pipe(map((x: any) => JSON.parse(x.contents))).subscribe(data => {
      this.gpsPositionOptions$.next(data);
    });
  }
}
