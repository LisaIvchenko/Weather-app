import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurement'
})
export class MeasurementPipe implements PipeTransform {

  transform(temp: number, measurement: 'C' | 'F'): unknown {
    return measurement === 'C' ? temp : temp * 1.8 + 32;
  }

}
