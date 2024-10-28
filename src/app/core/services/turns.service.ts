import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../models/enviroment';
import { Vehicle } from '../models/vehicles.interface';
import { Service } from '../models/service.interface';
import { Dates } from '../models/dates.interface';
import { Turn } from '../models/turn.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {
  
  turnSummary!:Turn;
  
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://190.226.1.141:5198';

  constructor() { }


  getVehicles() {

    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get<Vehicle[]>(`${this.baseUrl}/clientes/vehiculos`,httpOptions);
  }

  getSchedules(selectedDate: string, idService: string) {
    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      params: new HttpParams()
      .set('fecha', selectedDate)
    };

    return this.httpClient.get<Dates>(`${this.baseUrl}/turnos/horarios/${idService}`,httpOptions);
  }

  confirmTurn(selectedDate: string, selectedHour: string, idService: string) {
    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.post<Turn>(`${this.baseUrl}/turnos/solicitar`,{servicioId:idService,fecha:selectedDate,hora:selectedHour},httpOptions);
  }
  
}
