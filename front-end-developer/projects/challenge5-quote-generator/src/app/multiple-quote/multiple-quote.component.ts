import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../quote.model';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-multiple-quote',
  templateUrl: './multiple-quote.component.html',
  styleUrls: ['./multiple-quote.component.css']
})
export class MultipleQuoteComponent implements OnInit {

  author = '';
  quoteList: Quote[] = [];

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.author = this.route.snapshot.paramMap.get('author') || '';
    this.fetchQuotes();
  }

  fetchQuotes(): void {
    this.quoteService.getAuthorQuote(this.author).subscribe(
      (response: any) => {
        this.setQuoteList(response);
      },
      (error: any) => console.error(error)
    );
  }

  setQuoteList(response: any): void {
    this.quoteList = response.data;
  }

}
