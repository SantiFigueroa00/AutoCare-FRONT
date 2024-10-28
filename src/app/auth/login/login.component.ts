import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  router=inject(Router);
  formulario:FormGroup;
  usersService=inject(UsersService);

  constructor(){
    this.formulario=new FormGroup({
      email: new FormControl(),
      clave: new FormControl()
    });
  }

  onSubmit(){
    console.log(this.formulario.value);
    this.usersService.login(this.formulario.value).subscribe(res=>{
      console.log(res);
      this.formulario.reset;
      this.router.navigate(['/turns/new']);
    })
  }
}
