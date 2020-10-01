import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { IconPipe } from './pipes/icon.pipe';
import { WindDirectionPipe } from './pipes/wind-direction.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { MeasurementPipe } from './pipes/measurement.pipe';
import { PreloaderComponent } from './preloader/preloader.component';
import {WeatherService} from './weather.service';

@NgModule({
  declarations: [
    AppComponent,
    IconPipe,
    WindDirectionPipe,
    IconPipe,
    MeasurementPipe,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
