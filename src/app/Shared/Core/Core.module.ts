import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { FirtLetterPipe } from './pipes/first-letter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    OnlyNumbersDirective,

    FirtLetterPipe

  ],
  exports: [
    OnlyNumbersDirective,

    FirtLetterPipe
  ]
})
export class CoreModule { }
