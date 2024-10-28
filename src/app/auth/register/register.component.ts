import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { compileNgModule } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  router=inject(Router);
  formulario:FormGroup;
  userService=inject(UsersService);

  constructor(){
    this.formulario= new FormGroup({
      nombre:new FormControl(),
      apellido:new FormControl(),
      email:new FormControl(),
      clave:new FormControl(),
    });
  }

  onSubmit(event: Event){

    console.log(this.formulario.value);

    this.userService.register(this.formulario.value).subscribe(res => {
      console.log(res)

      this.router.navigate(['/login']);
    });
  }
}
