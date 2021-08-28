import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BreedDetail, Image } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }

  getBreedDetail(breed: string): Observable<BreedDetail> {
    const url = `${environment.apiUrl}/cats/${breed}`;
    return this.http.get(url) as Observable<BreedDetail>;
  }

  getBreedImages(breed: string, limit = 8): Observable<Image> {
    const url = `${environment.apiUrl}/cats/${breed}/images?limit=${limit}`;
    return this.http.get(url) as Observable<Image>;
  }
}
