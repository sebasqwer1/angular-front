import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  title = 'consumo';
  showButtons = false;
  constructor(
    private routerparams: Router,
    private sharedService: SharedService
  ){}

  toggleNavbar() {
    this.showButtons = !this.showButtons;
  }

  obtenerParametro() {
    const parametro = this.sharedService.estado;
    return parametro
    // Haz algo con el parámetro recibido en el componente madre
  }


  RegistrarCobros(): void{
    this.routerparams.navigate(['Registro']);
    this.toggleNavbar()
  }

  Regularizar(): void{
    this.routerparams.navigate(['Regularizar']);
    this.toggleNavbar()
  }

  GenerarFacturas(): void{
    this.routerparams.navigate(['Facturar']);
    this.toggleNavbar()
  }
}
