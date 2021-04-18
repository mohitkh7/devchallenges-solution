import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quote } from './quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  readonly REMOTE_URL = 'https://quote-garden.herokuapp.com/api/v3/quotes/';
  quote: Quote = {
    _id: '',
    quoteText: '',
    quoteAuthor: '',
    quoteGenre: ''
  };
  quote$ = new BehaviorSubject<Quote>(this.quote);

  constructor(private http: HttpClient) {
  }

  getRandomQuote(): void {
    const url = this.REMOTE_URL + 'random';
    // tslint:disable-next-line: deprecation
    this.http.get(url).subscribe((response: any) => {
      this.quote = response.data[0];
      this.quote$.next(this.quote);
    });
  }

  getAuthorQuote(author: string): any {
    let params = new HttpParams();
    params = params.append('author', author);
    return this.http.get(this.REMOTE_URL, { params });
  }
}
