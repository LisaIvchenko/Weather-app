import { Component, HostListener, OnInit } from '@angular/core';
import { IResponse, WeatherService } from './weather.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public formCity: FormGroup;
  public weather$: Observable<IResponse>;
  public defaultCity = 'Краснодар';
  public measurement: 'C' | 'F' = 'C';
  public isEditCity: boolean;
  public innerWidth: number;

  constructor(private weatherService: WeatherService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isEditCity = innerWidth > 1023;
  }

  public ngOnInit(): void {
    this.isEditCity = innerWidth > 1023;
    this.formCity = new FormGroup({
      city: new FormControl('', [
        Validators.required,
      ]),
    });
    this.getDefaultCity();
  }

  public getWeather(city?: string): void {
    this.weather$ = this.weatherService.getCurrentWeather(city);
    this.weatherService.getCurrentWeather(city)
      .subscribe(
        () => this.isEditCity = window.innerWidth > 1023,
        () => this.getDefaultCity()
      );
  }

  public getWeatherByLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successFunction.bind(this), this.errorFunction);
    } else {
      this.errorFunction();
    }
  }

  public successFunction(position): void {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.weather$ = this.weatherService.getWeatherByLocation(lat, long);
  }

  public errorFunction(): void {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
  }

  public changeMeasurement(mode: 'C' | 'F'): void {
    this.measurement = mode;
  }

  public getDefaultCity(): void {
    this.formCity.controls.city.setValue(this.defaultCity);
    this.getWeather(this.defaultCity);
  }

  public changeMobileEditMode(): void {
    this.isEditCity = true;
  }
}
