import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { typeService } from '../../../../core/models/typeService.interface';
import { comboService } from '../../../../core/models/comboService.interface';
import { ServiceService } from '../../../../core/services/service.service';
import { Router } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-turn-services',
  standalone: true,
  imports: [
    CommonModule,
    ListboxModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './turn-services.component.html',
  styleUrl: './turn-services.component.css',
})
export class TurnServicesComponent implements OnInit {
  serv = inject(ServiceService);

  typeServices: typeService[] = [];
  combos: comboService[] = [];
  router = inject(Router);
  selectedTypeServices: typeService[] = [];
  selectedCombos: comboService[] = [];

  ngOnInit(): void {
    this.serv.getTypeServices().subscribe((res) => {
      this.typeServices = res.map((service) => ({
        ...service, // Copiamos las propiedades del objeto original
        type: 'typeService', // Añadimos el campo 'type'
      }));
    });
    this.serv.getCombos().subscribe((res) => {
      this.combos = res.map((combo) => ({
        ...combo, // Copiamos las propiedades del objeto original
        type: 'comboService', // Añadimos el campo 'type'
      }));
    });
  }

  onClick() {
    this.selectedTypeServices.forEach(ts => {
      this.serv
        .addTypeServices(this.serv.service.id, ts.id)
        .subscribe((res) => {
          this.serv.newService(res);
        });
    });
    this.selectedCombos.forEach(c => {
      this.serv
        .addComboServices(this.serv.service.id, c.id)
        .subscribe((res) => {
          this.serv.newService(res);
        });
    });
    this.router.navigate(['/turns/new/date']);
  }

}
