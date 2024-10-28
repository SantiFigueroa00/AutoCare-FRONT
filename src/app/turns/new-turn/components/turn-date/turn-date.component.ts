import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MAT_DATE_FORMATS, MatDateFormats, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ServiceService } from '../../../../core/services/service.service';
import { TurnsService } from '../../../../core/services/turns.service';
import { Dates } from '../../../../core/models/dates.interface';
import { Router } from '@angular/router';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-turn-date',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './turn-date.component.html',
  styleUrl: './turn-date.component.css'
})
export class TurnDateComponent {


  turnService=inject(TurnsService);
  serv=inject(ServiceService);
  router=inject(Router);
  cdr = inject(ChangeDetectorRef);

  readonly minDate = new Date();
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  };

  selectedDate: Date | null = null;
  selectedMonth: number  = 0;
  selectedYear: number = 0;
  selectedHour: string = '';
  datesDisp!: Dates;
  schedulesDisp: string[]=[];

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1); 
    const day = String(date.getDate()); 
  
    return `${year}-${month}-${day}`;
  }

  onDateChange() {


    this.turnService.getSchedules(this.formatDateToYYYYMMDD(this.selectedDate!),this.serv.service.id).subscribe(res=>{
      this.datesDisp=res;
      this.schedulesDisp=this.datesDisp.horarios;
      this.cdr.detectChanges();
      console.log(this.schedulesDisp);
    });
  }

  onClick(hour:string){
    this.selectedHour=hour;
  }

  onConfirm() {
    this.turnService.confirmTurn(this.formatDateToYYYYMMDD(this.selectedDate!),this.selectedHour,this.serv.service.id).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/turns/summary']);
    });
  }
}
