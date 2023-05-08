import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[only-numbers]'
})
export class OnlyNumbersDirective {

  @Input() decimal = false;

  constructor() { }
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {

    if (!this.decimal) return this.onlyNumbers(e.key);

    if (isNaN(parseInt(e.key))) return e.key == '.';
    else return parseInt(e.key) >= 0 && parseInt(e.key) <= 9;
  }

  private onlyNumbers(key: string): boolean {
    //return /^\d{1,10}(\.\d{1,4})?$/.test(key);
    return /^\d+$/.test(key);
  }
}
