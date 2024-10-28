import { Component, inject, OnInit } from '@angular/core';
import { TurnsService } from '../../../../core/services/turns.service';
import { Vehicle } from '../../../../core/models/vehicles.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../../../../core/services/service.service';
import { ListboxModule } from 'primeng/listbox';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-turn-vehicles',
  standalone: true,
  imports: [CommonModule, ListboxModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './turn-vehicles.component.html',
  styleUrl: './turn-vehicles.component.css',
})
export class TurnVehiclesComponent implements OnInit {
  router = inject(Router);
  turnsService = inject(TurnsService);
  vehicles: Vehicle[] = [];
  formulario!: FormGroup;

  constructor(private serv: ServiceService) {}

  ngOnInit() {
    this.turnsService.getVehicles().subscribe((res) => {
      this.vehicles = res;
      console.log(this.vehicles);
      this.formulario = new FormGroup({
        selectedVehicle: new FormControl<Vehicle | null>(null),
      });
    });
  }

  onSubmit() {
    console.log(this.formulario.value.selectedVehicle);
    this.serv
      .initService(this.formulario.value.selectedVehicle.id)
      .subscribe((res) => {
        this.serv.newService(res);
        this.router.navigate(['/turns/new/services']);
      });
  }
}
