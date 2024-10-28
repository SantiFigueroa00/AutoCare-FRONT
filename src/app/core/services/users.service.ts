import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Login } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl = 'http://190.226.1.169:5198/auth';

  constructor() {}

  register(formValue:any) { 
    return this.httpClient.post<any>(`${this.baseUrl}/register`,formValue);
  }

  login(formValue:any) { 
    return this.httpClient.post<Login>(`${this.baseUrl}/login`,formValue);
  }
}
