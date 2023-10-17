import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/constants/message';
import { ClientesRequestModel, ConsumoPrevioRequestModel } from 'src/app/models/consumo_previo.model';
import { ReporteService } from './reporte.service';
import { ErrorPresentationService } from 'src/app/services/errorPresentationService';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActualizarPagoRequestModel } from 'src/app/models/reporte-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reporte-root',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ReporteComponent {
  title = 'consumo';
  formRegistro!: FormGroup;
  Clientes: any[] | undefined;
  codigosMessage: any;
  mensajesMessage: any;

  isAuthenticated: boolean = false

  products!: any;

  constructor(private queryManagementService: ReporteService,
    public authService: AuthService
    , private routerparams: Router
    ,private errorPresentationService: ErrorPresentationService
    ,private confirmationService: ConfirmationService
    ,private messageService: MessageService
  ) {
    this.buildForm();
  }

  ngOnInit() {

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if(!this.isAuthenticated){
        this.routerparams.navigate(['Login']);
      }
    });

    let request: ClientesRequestModel = {
      Token:"015ec0d618fe3fa9c7d0a1abda2b159c"
    }
    this.queryDataToServiceRemoteCliente(request)
  }

  queryDataToServiceRemoteCliente(entityRequest: ClientesRequestModel) {
    [this.codigosMessage, this.mensajesMessage] = MessageConstants;

    this.queryManagementService.getClientes(entityRequest)
      .subscribe(
        {
          next: (data) => {
            let dataTmp = data;
            if(dataTmp.length > 0) {
              this.Clientes =  dataTmp
            }else{
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


  buildForm(){

    this.formRegistro = new FormGroup({
      Cliente: new FormControl(null, Validators.required),
      Valor: new FormControl(null, Validators.required),
      Deuda: new FormControl(null, Validators.required),
    });
  }

  onItemChanged(){
    const selectedCliente = this.formRegistro.get('Cliente')?.value;
    console.log(selectedCliente)
      if (selectedCliente) {
        this.formRegistro.get("Cliente")?.patchValue(selectedCliente)

        let request: ConsumoPrevioRequestModel = {
          token:"015ec0d618fe3fa9c7d0a1abda2b159c",
          IdCliente: selectedCliente.code
        }

        this.queryDataToServiceRemoteConsumoPrevio(request)
      }
  }

  onConfirm(){

  }

  ActualizarPago(data: any) {

    const {id, id_cliente, nombre} = data

    let Deuda = this.formRegistro.get("Deuda")?.value
    let ValorPagar = this.formRegistro.get("Valor")?.value

    if(ValorPagar === 0 || ValorPagar === null){
      this.messageService.add({severity:'error', detail: 'Ingrese un valor mayor a 0'});
      return
    }

    if(ValorPagar > Deuda){
      this.messageService.add({severity:'error', detail: 'No puede pagar mas de lo que debe'});
      this.formRegistro.get("Valor")?.patchValue(Deuda)
      return
    }


    this.confirmationService.confirm({
        message: `¿Está seguro de realizar el pago a <strong>${nombre}</strong> por <strong>$${ValorPagar}</strong>?`,
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.ActualizarPagos(id, id_cliente, Deuda, ValorPagar)
        },
        reject: (type: any) => {
            console.log(type)
        }
    });
}

  ActualizarPagos(id:number, id_cliente: number, Deuda: number, ValorPagar: number){


    let ValorActual = (Deuda - ValorPagar).toFixed(2);

    let request: ActualizarPagoRequestModel = {
      Token:"015ec0d618fe3fa9c7d0a1abda2b159c",
      IdConsumo: id,
      IdCliente: id_cliente,
      Valor: ValorActual,
      ValorPagado: ValorPagar,
      Deuda: Deuda
    }

    console.log(request)

    this.RegistrarPago(request)
  }

  RegistrarPago(request: ActualizarPagoRequestModel) {

    this.queryManagementService.ActualizarPago(request)
      .subscribe(
        {
          next: (data) => {
            let dataTmp = data;
            if(dataTmp) {
              if(dataTmp.status === "OK"){
                this.messageService.add({severity:'success', detail: 'Pago registrado exitosamente'});
                this.onItemChanged()
              } else {
                this.messageService.add({severity:'info', detail: dataTmp.message});
              }
            }
          },
          error: (error) => {
            this.setErrorMessages(error);
          },
          complete: () => {

          }
        }
      );
  }

  queryDataToServiceRemoteConsumoPrevio(entityRequest: ConsumoPrevioRequestModel) {
    [this.codigosMessage, this.mensajesMessage] = MessageConstants;

    this.queryManagementService.getDeudas(entityRequest)
      .subscribe(
        {
          next: (data) => {
            let dataTmp = data;
            if(dataTmp.length > 0) {
              this.products = dataTmp
              console.log(this.products)
              this.formRegistro.get("Valor")?.patchValue(this.products[0].deuda)
              this.formRegistro.get("Deuda")?.patchValue(this.products[0].deuda)
            }else{
              this.products = []
              this.messageService.add({severity:this.codigosMessage.SEVINFO, detail:"El cliente no tiene deuda"});
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

  setErrorMessages(error: any) {

    this.errorPresentationService.error = error;
    this.errorPresentationService.handleError();
  }


}
