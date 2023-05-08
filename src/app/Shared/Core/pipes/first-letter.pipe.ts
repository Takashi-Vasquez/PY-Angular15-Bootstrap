import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirtLetterPipe implements PipeTransform {
  /**
    * Transform
    *
    * @param value: any
    * @param args: any
    */
  transform(value: any, args?: any): any {
    return value
      .split(' ')
      .map((n: any) => n[0])
      .join('');
  }
}
