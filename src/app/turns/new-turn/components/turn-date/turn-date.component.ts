import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MAT_DATE_FORMATS, MatDateFormats, provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ServiceService } from '../../../../core/services/service.service';
import { TurnsService } from '../../../../core/services/turns.service';
import { Dates } from '../../../../core/models/dates.interface';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

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
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule,FormsModule, CalendarModule, ButtonModule, SelectButtonModule,TagModule,MessagesModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './turn-date.component.html',
  styleUrl: './turn-date.component.css'
})
export class TurnDateComponent implements OnInit{

  messages: Message[] | undefined = [{ severity: 'warn', detail: 'No hay turnos disponibles para la fecha seleccionada' }];
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

  selectedDate: Date = new Date();
  selectedMonth: number  = 0;
  selectedYear: number = 0;
  selectedHour: string = '';
  datesDisp!: Dates;
  schedulesDisp: string[]=[];
  groupedSchedulesDisp: any[][] = [];

  ngOnInit(): void {
    this.turnService.getSchedules(this.formatDateToYYYYMMDD(this.selectedDate!),this.serv.service.id).subscribe(res=>{
      this.datesDisp=res;
      this.schedulesDisp=this.datesDisp.horarios;
      this.groupSchedules();
      this.cdr.detectChanges();
      console.log(this.schedulesDisp);
    });
  }

  groupSchedules() {
    this.groupedSchedulesDisp= [];
    for (let i = 0; i < this.schedulesDisp.length; i += 3) {
      this.groupedSchedulesDisp.push(this.schedulesDisp.slice(i, i + 3));
    }
  }


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
      this.groupSchedules();
      this.cdr.detectChanges();
      console.log(this.schedulesDisp);
    });
  }


  onConfirm() {
    this.turnService.confirmTurn(this.formatDateToYYYYMMDD(this.selectedDate!),this.selectedHour,this.serv.service.id).subscribe(res=>{
      this.turnService.turnSummary=res;
      console.log(this.turnService.turnSummary);
      this.cdr.detectChanges();
      this.router.navigate(['/turns/summary']);
    });
  }
}
