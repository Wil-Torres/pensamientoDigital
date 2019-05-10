import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
    
  ]
})
export class CalendarioModule { }
