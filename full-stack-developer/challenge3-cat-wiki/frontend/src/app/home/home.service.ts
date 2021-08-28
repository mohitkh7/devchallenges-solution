import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Breed } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBreedList(): Observable<Breed> {
    const url = `${environment.apiUrl}/cats/`;
    return this.http.get(url) as Observable<Breed>;
  }
}
