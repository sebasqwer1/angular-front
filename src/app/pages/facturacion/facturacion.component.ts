import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/constants/message';
import { FacturacionService } from './facturacion.service';
import { ErrorPresentationService } from 'src/app/services/errorPresentationService';
import { MessageService } from 'primeng/api';
import { FacturacionRequestModel } from 'src/app/models/facturacion.model';
import { SharedService } from 'src/app/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'facturacion-root',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent {
  @ViewChild('reciboContent') reciboContent!: ElementRef;

  title = 'consumo';
  formFacturacion!: FormGroup;
  Clientes: any[] | undefined;
  codigosMessage: any;
  mensajesMessage: any;
  estadoVisual:boolean = true

  screenWidth!: number;

  isAuthenticated: boolean = false

  products!: any;

  constructor(
    private queryManagementService: FacturacionService,
    public authService: AuthService
    , private routerparams: Router
    , private errorPresentationService: ErrorPresentationService
    , private sharedService: SharedService
    ,private messageService: MessageService
  ) {
    this.screenWidth = window.innerWidth;
    this.buildForm();// Puedes inicializar date con la fecha actual o alguna otra fecha
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if(!this.isAuthenticated){
        this.routerparams.navigate(['Login']);
      }
    });

  }

  getCurrentDate(): Date {
    return new Date();
  }

  actualizarEstado(flag: boolean) {
    this.sharedService.estado = flag; // Cambiar el estado según tus necesidades
    this.estadoVisual = flag
  }


  imprimirPDF() {
    this.actualizarEstado(false);

    this.screenWidth = 700

    // Esperar 2 segundos antes de imprimir
    setTimeout(() => {
      window.print();
      this.actualizarEstado(true);
      this.screenWidth = window.innerWidth
    }, 1000); // 2000 milisegundos = 2 segundos

    //
  }

  queryDataToServiceRemoteCliente(entityRequest: FacturacionRequestModel) {
    [this.codigosMessage, this.mensajesMessage] = MessageConstants;

    this.queryManagementService.getFacturas(entityRequest)
      .subscribe(
        {
          next: (data) => {
            let dataTmp = data;
            if(dataTmp.length > 0) {
              this.Clientes =  dataTmp
            }else{
              this.Clientes = []
              this.messageService.add({severity:this.codigosMessage.SEVINFO, detail: this.mensajesMessage.MSGSINDATOS});
            }
          },
          error: (error) => {

            this.errorPresentationService.error = error;
            this.errorPresentationService.handleError();
          },
          complete: () => {

          }
        }
      );
  }

  convertirFecha(fecha: any){
    const fechaOriginal = new Date(fecha);
    const anio = fechaOriginal.getFullYear();
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en Date son base 0
    const fechaNueva = `${anio}-${mes}`;
    return fechaNueva
  }


  buildForm(){
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    this.formFacturacion = new FormGroup({
      Fecha: new FormControl(today, Validators.required)
    });
  }

  Generar(){
    let request: FacturacionRequestModel = {
      Token: "015ec0d618fe3fa9c7d0a1abda2b159c",
      Fecha: this.convertirFecha(this.formFacturacion?.get('Fecha')?.value)
    }
    this.queryDataToServiceRemoteCliente(request)
  }



  setErrorMessages(error: any) {

    this.errorPresentationService.error = error;
    this.errorPresentationService.handleError();
  }


}
