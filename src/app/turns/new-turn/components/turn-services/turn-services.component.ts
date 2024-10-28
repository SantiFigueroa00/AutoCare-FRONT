import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { typeService } from '../../../../core/models/typeService.interface';
import { comboService } from '../../../../core/models/comboService.interface';
import { ServiceService } from '../../../../core/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turn-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-services.component.html',
  styleUrl: './turn-services.component.css'
})
export class TurnServicesComponent implements OnInit{


  serv=inject(ServiceService)

  typeServices: typeService[] = [];
  combos: comboService[] = [];
  router=inject(Router);

  ngOnInit(): void {
    this.serv.getTypeServices().subscribe(res=>{
      this.typeServices = res.map(service => ({
        ...service, // Copiamos las propiedades del objeto original
        type: 'typeService' // Añadimos el campo 'type'
      }));
    });
    this.serv.getCombos().subscribe(res=>{
      this.combos = res.map(combo => ({
        ...combo, // Copiamos las propiedades del objeto original
        type: 'comboService' // Añadimos el campo 'type'
      }));
    });
  }

  onClick(line: typeService|comboService) {
    if(line.type === 'typeService'){
      this.serv.addTypeServices(this.serv.service.id,line.id).subscribe(res=>{
        this.serv.newService(res);
      });
    }else if(line.type === 'comboService'){
      this.serv.addComboServices(this.serv.service.id,line.id).subscribe(res=>{
        this.serv.newService(res);
      });
    }
  }

  onContinue() {
    this.router.navigate(['/turns/new/date']);
  }
}
