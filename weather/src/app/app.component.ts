import {Component, HostListener, OnInit} from '@angular/core';
import {IResponse, WeatherService} from './weather.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

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
  onResize(event): void {
    window.innerWidth > 1023 ? this.isEditCity = true : this.isEditCity = false;
  }

  public ngOnInit(): void {
    window.innerWidth > 1023 ? this.isEditCity = true : this.isEditCity = false;
    this.formCity = new FormGroup({
      city: new FormControl('', [
        Validators.required,
      ]),
    });
    this.getDefaultCity();
  }

  public getWeather(city: string): void {
    this.weather$ = this.weatherService.getCurrentWeather(city);
    this.weatherService.getCurrentWeather(city)
      .subscribe(
        () => this.isEditCity = false,
        () => this.getDefaultCity()
      );
    console.log(this.weather$);
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
