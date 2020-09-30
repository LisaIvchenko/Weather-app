import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from './config';
import {Observable} from 'rxjs';

export interface IResponse {
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  weather: IWeather[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface IWeather {
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public config = config;

  constructor(private http: HttpClient) { }

  public queryParams(params): string {
    const esc = encodeURIComponent;
    return `?${Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&')}`;
  }

  public getCurrentWeather(city?: string, lat?: number, lon?: number): Observable<IResponse> {
    let queryParams = {
      appid: this.config.key,
      lang: this.config.lang,
      units: 'metric',
    };
    if (!!city) {
      queryParams = {...queryParams, ...{q: city}};
    }
    if (!!lat && !!lon) {
      const coordinates = {
        lat,
        lon
      };
      queryParams = {...queryParams, ...coordinates};
    }
    return this.http.get<any>(`${this.config.url}${this.queryParams(queryParams)}`);
  }
}
