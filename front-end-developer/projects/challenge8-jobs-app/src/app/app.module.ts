import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaysAgoPipe } from './days-ago.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FilterComponent,
    ListComponent,
    DetailsComponent,
    MainComponent,
    DaysAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
