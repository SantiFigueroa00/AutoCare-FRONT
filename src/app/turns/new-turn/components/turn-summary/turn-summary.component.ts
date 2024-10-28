import { Component, inject, OnInit } from '@angular/core';
import { ServiceService } from '../../../../core/services/service.service';
import { ComboLine, Service, ServiceLine } from '../../../../core/models/service.interface';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Turn } from '../../../../core/models/turn.interface';
import { TurnsService } from '../../../../core/services/turns.service';

@Component({
  selector: 'app-turn-summary',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,TableModule],
  templateUrl: './turn-summary.component.html',
  styleUrl: './turn-summary.component.css'
})
export class TurnSummaryComponent implements OnInit {


  service: Service | undefined;
  turnService=inject(TurnsService)
  turnSummary!: Turn;

  constructor(private servService : ServiceService){}

  ngOnInit(): void {
    this.servService.services.subscribe(res=>{
      if(res){
        this.servService.getService(res.id).subscribe(res=>{
          this.service=res;

          this.service.lineasDeCombo = this.service.lineasDeCombo.map(comboLine => ({
            ...comboLine, 
            type: 'ComboLine' 
          }));
          this.service.lineasDeServicio = this.service.lineasDeServicio.map(serviceLine => ({
            ...serviceLine, 
            type: 'ServiceLine' 
          }));
          console.log(this.service);
        });
      }
    });
    this.turnSummary=this.turnService.turnSummary;
  }

  onDelete(line: ServiceLine | ComboLine) {
    if(line.type === 'ServiceLine'){
      this.servService.deleteTypeServices(this.servService.service.id,line.id).subscribe(res=>{
        this.servService.newService(res);
      });
    }else if(line.type === 'ComboLine'){
      this.servService.deleteComboServices(this.servService.service.id,line.id).subscribe(res=>{
        this.servService.newService(res);
      });
    }
  }
}
