import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteService } from '../quote.service';
import { Quote } from '../quote.model';

import { SingleQuoteComponent } from './single-quote.component';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SingleQuoteComponent', () => {
  let component: SingleQuoteComponent;
  let fixture: ComponentFixture<SingleQuoteComponent>;
  const sampleQuote = {
    _id: '1',
    quoteText: 'text',
    quoteAuthor: 'author',
    quoteGenre: 'genre'
  };
  const subjectMock = new BehaviorSubject<any>(sampleQuote);
  const mockQuoteService = {
    quote$: subjectMock.asObservable()
  };

  beforeEach(async () => {
    // const spy = jasmine.createSpyObj('QuoteService', ['quote$']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SingleQuoteComponent ],
      providers: [{ provide: QuoteService, useValue: mockQuoteService }]
    })
    .compileComponents();
    // quoteService = TestBed.inject(QuoteService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetchQuote() should fetch random quote', () => {
    component.fetchQuote();
    expect(component.quote).toEqual(sampleQuote);
  });
});
