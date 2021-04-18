import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote.model';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-single-quote',
  templateUrl: './single-quote.component.html',
  styleUrls: ['./single-quote.component.css']
})
export class SingleQuoteComponent implements OnInit {
  quote: Quote = {
    _id: '',
    quoteText: '',
    quoteAuthor: '',
    quoteGenre: ''
  };

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.fetchQuote();
  }

  fetchQuote(): void {
    // tslint:disable-next-line: deprecation
    this.quoteService.quote$.subscribe((quote: Quote) => {
      this.quote = quote;
    });
  }

}
