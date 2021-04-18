import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { QuoteService } from './quote.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let quoteService: QuoteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: QuoteService }
      ]
    }).compileComponents();
    quoteService = TestBed.inject(QuoteService);
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('getRandomQuote should trigger service to fetch random quote ', () => {
    spyOn(quoteService, 'getRandomQuote');
    component.getRandomQuote();
    expect(quoteService.getRandomQuote).toHaveBeenCalled();
  });
});
