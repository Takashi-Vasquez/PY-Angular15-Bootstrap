import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreService } from '../services/coreService.service';
import { HttpService } from '../services/http.service';
import { SweetAlertService } from '../services/sweet-alert.service';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { FirtLetterPipe } from './pipes/first-letter.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [

    OnlyNumbersDirective,

    FirtLetterPipe

  ],
  exports: [
    OnlyNumbersDirective,

    FirtLetterPipe
  ],
  providers: [
    CoreService,
    HttpService,
    SweetAlertService
  ]
})
export class CoreModule { }
