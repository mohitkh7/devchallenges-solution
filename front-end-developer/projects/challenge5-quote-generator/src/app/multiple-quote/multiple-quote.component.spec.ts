import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { QuoteService } from '../quote.service';

import { MultipleQuoteComponent } from './multiple-quote.component';

describe('MultipleQuoteComponent', () => {
  let component: MultipleQuoteComponent;
  let fixture: ComponentFixture<MultipleQuoteComponent>;
  let quoteService: QuoteService;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('QuoteService', ['getAuthorQuote']);
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ MultipleQuoteComponent ],
      providers: [{ provide: QuoteService}]
    })
    .compileComponents();
    quoteService = TestBed.inject(QuoteService);
  });

  beforeEach(() => {
    // spyOn(quoteService, 'getAuthorQuote').and.returnValue(of({}));
    fixture = TestBed.createComponent(MultipleQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetchQuotes should fetch quote from service and call setQuoteList()', () => {
    spyOn(quoteService, 'getAuthorQuote').and.returnValue(of({}));
    spyOn(component, 'setQuoteList');
    component.fetchQuotes();
    expect(quoteService.getAuthorQuote).toHaveBeenCalled();
  });

  it('fetchQuotes should handle service failure', () => {
    spyOn(console, 'error');
    spyOn(quoteService, 'getAuthorQuote').and.returnValue(
      throwError({status: 404}));
    component.fetchQuotes();
    expect(console.error).toHaveBeenCalled();
  });

  it('setQuoteList should set quoteList equal to input param', () => {
    const resp = {
      data: []
    };
    component.setQuoteList(resp);
    expect(component.quoteList).toEqual([]);
  });
});
