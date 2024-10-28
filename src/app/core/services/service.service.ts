import { inject, Injectable } from '@angular/core';
import { Service } from '../models/service.interface';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../models/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { typeService } from '../models/typeService.interface';
import { comboService } from '../models/comboService.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://190.226.1.169:5198';

  private _service: BehaviorSubject<Service | null> = new BehaviorSubject<Service | null>(null);

  service!: Service;

  constructor() {}

  get services(){
    return this._service.asObservable(); 
  }

  newService(serv: Service){
    this.service=serv;
    this._service.next(serv);
  }

  initService(vehiculoId: string) {

    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.post<Service>(`${this.baseUrl}/servicios/iniciar`,{vehiculoId:vehiculoId},httpOptions);
  }

  getService(idService:string) {

    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get<Service>(`${this.baseUrl}/servicios/${idService}`,httpOptions);
  }

  getTypeServices() {

    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get<typeService[]>(`${this.baseUrl}/servicios/tipos`,httpOptions);
  }

  getCombos() {

    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get<comboService[]>(`${this.baseUrl}/servicios/combos`,httpOptions);
  }

  addComboServices(idServ:string, idCombo:string) {
    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.patch<Service>(`${this.baseUrl}/servicios/${idServ}/lineaDeCombo`,{comboId:idCombo},httpOptions);
  }
  addTypeServices(idServ:string, idTypeService:string) {
    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.patch<Service>(`${this.baseUrl}/servicios/${idServ}/lineaDeServicio`,{tipoDeServicioId:idTypeService},httpOptions);
  }

  deleteComboServices(idServ: string, idCombo: string) {
    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.delete<Service>(`${this.baseUrl}/servicios/${idServ}/lineaDeCombo/${idCombo}`,httpOptions);
  }


  deleteTypeServices(idServ:string, idTypeService:string) {
    const token = enviroment.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.delete<Service>(`${this.baseUrl}/servicios/${idServ}/lineaDeServicio/${idTypeService}`,httpOptions);
  }

}
