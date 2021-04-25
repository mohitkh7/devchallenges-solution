import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WindbnbComponent } from './windbnb/windbnb.component';
import { DisplayGuestCountPipe } from './windbnb/display-guest-count.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WindbnbComponent,
    DisplayGuestCountPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
