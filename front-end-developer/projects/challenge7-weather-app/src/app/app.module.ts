import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FutureContainerComponent } from './future-container/future-container.component';
import { FutureDetailComponent } from './future-detail/future-detail.component';
import { StatsContainerComponent } from './stats-container/stats-container.component';
import { MainComponent } from './main/main.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { SideLocationComponent } from './side-location/side-location.component';
import { SideDetailComponent } from './side-detail/side-detail.component';
import { TemperaturePipe } from './temperature/temperature.pipe';
import { HttpClientModule } from '@angular/common/http';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FutureContainerComponent,
    FutureDetailComponent,
    StatsContainerComponent,
    MainComponent,
    SidePanelComponent,
    SideLocationComponent,
    SideDetailComponent,
    TemperaturePipe,
    WeatherIconComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
