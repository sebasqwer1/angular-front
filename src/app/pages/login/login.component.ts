import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from './login.service';
import { LoginModelRequest } from './login.model';

@Component({
  selector: 'app-popup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  display: boolean = false;
  contrasena: string = '';
  formLogin!: FormGroup;

  constructor(
    private authService: AuthService,
    private routerparams: Router,
    private messageService: MessageService,
    private loginService: LoginService
  ){
    this.buildForm();
  }

  mostrarPopup() {
    this.display = true;
  }

  ngOnInit(){
    console.log("popur")
    this.mostrarPopup()
    console.log(import.meta.env)
  }

  buildForm(){

    this.formLogin = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.required)
    });
  }

  async verificarContrasena() {

    const isAutenticated = await this.authService.login(this.formLogin.get("userName")?.value, this.formLogin.get("userPassword")?.value)

    if(isAutenticated){
      this.routerparams.navigate(['Registro']);
    }else{
      this.messageService.add({severity:'error', detail: 'El usuario o la contraseña es incorrecta'});
    }

  }
}
