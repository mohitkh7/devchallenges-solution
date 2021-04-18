import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote.service';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(QuoteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomQuote() should make get request to fetch random quote', () => {
    const sampleQuote = {
      _id: '1',
      quoteText: 'text',
      quoteAuthor: 'author',
      quoteGenre: 'genre'
    };
    service.getRandomQuote();
    const req = httpTestingController.expectOne('https://quote-garden.herokuapp.com/api/v3/quotes/random');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: [sampleQuote]
    });
    expect(service.quote).toEqual(sampleQuote);
  });

  it('getAuthorQuote() should make get request to fetch all quote from an author', () => {
    const testData = {k: 'value'};
    const author = 'ABC';
    service.getAuthorQuote(author).subscribe((data: any) => {
      expect(data).toEqual(testData);
    });
    const params = new HttpParams().append('author', author);
    const expectedReq = new HttpRequest(
      'GET',
      'https://quote-garden.herokuapp.com/api/v3/quotes/',
      {params});
    const request = httpTestingController.expectOne((req: HttpRequest<any>) =>
      req.method === expectedReq.method && req.urlWithParams === expectedReq.urlWithParams);
    request.flush(testData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
