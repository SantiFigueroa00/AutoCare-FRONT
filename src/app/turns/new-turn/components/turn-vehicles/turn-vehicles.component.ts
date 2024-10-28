import { Component, inject, OnInit } from '@angular/core';
import { TurnsService } from '../../../../core/services/turns.service';
import { Vehicle } from '../../../../core/models/vehicles.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../../../../core/services/service.service';

@Component({
  selector: 'app-turn-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-vehicles.component.html',
  styleUrl: './turn-vehicles.component.css'
})
export class TurnVehiclesComponent implements OnInit{

  router=inject(Router);
  turnsService=inject(TurnsService);
  vehicles:Vehicle[] = [];

  constructor(
    private serv:ServiceService
  ){}

  ngOnInit(){
    this.turnsService.getVehicles().subscribe(res=>{
      this.vehicles=res;
      console.log(this.vehicles);
    });
  }

  onClick(idVehicle: string) {
    this.serv.initService(idVehicle).subscribe(res=>{
      this.serv.newService(res); 
      this.router.navigate(['/turns/new/services']);
    });
  }
}
