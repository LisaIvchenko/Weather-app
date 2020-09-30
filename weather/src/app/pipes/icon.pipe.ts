import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(icon: string): string {
    const iconCode = icon.substring(0, 2);
    switch (iconCode) {
      case '01':
        return 'sun.svg';
      case '02':
        return 'partly-cloud.svg';
      case '03':
        return 'cloud.svg';
      case '04':
        return 'cloud.svg';
      case '09':
        return 'rain.svg';
      case '10':
        return 'rain.svg';
      case '11':
        return 'storm.svg';
      case '13':
        return 'snowflake.svg';
      case '50':
        return 'fog.svg';
      default:
        return '';
    }
  }

}
