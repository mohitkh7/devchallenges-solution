import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleQuoteComponent } from './single-quote/single-quote.component';
import { MultipleQuoteComponent } from './multiple-quote/multiple-quote.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleQuoteComponent,
    MultipleQuoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
