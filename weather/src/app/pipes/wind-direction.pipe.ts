import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirection'
})
export class WindDirectionPipe implements PipeTransform {

  public transform(degrees: number): string {
    if (degrees > 348.75 && degrees <= 360 || degrees <= 11.25) {
      return 'северный';
    } else if (degrees > 11.25 && degrees <= 78.25) {
      return 'северо-восточный';
    } else if (degrees > 78.25 && degrees <= 101.25) {
      return 'восточный';
    } else if (degrees > 101.25 && degrees <= 168.75) {
      return 'юго-восточный';
    } else if (degrees > 168.75 && degrees <= 191.25) {
      return 'южный';
    } else if (degrees > 191.25 && degrees <= 258.75) {
      return 'юго-западный';
    } else if (degrees > 258.75 && degrees <= 348.75) {
      return 'северо-западный';
    }
  }
}
