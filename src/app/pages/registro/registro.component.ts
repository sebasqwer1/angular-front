import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/constants/message';
import { ClientesRequestModel, ConsumoPrevioRequestModel, GuardarConsumoModel } from 'src/app/models/consumo_previo.model';
import { RegistroService } from './registro.service';
import { ErrorPresentationService } from 'src/app/services/errorPresentationService';
import { GenericValidatorService } from 'src/app/validators/generic-validator.service';
import { RegistroPrepareDataService } from './registro-prepare-data.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'registro-root',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  title = 'consumo';
  date: Date[] | undefined;
  formRegistro!: FormGroup;

  Clientes: any[] | undefined;
  consumo_previo: number = 0

  codigosMessage: any;
  mensajesMessage: any;

  selectedCountry: string | undefined;

  isAuthenticated: boolean = false

  constructor(
    public authService: AuthService,
    private queryManagementService: RegistroService
    , private prepareDataService: RegistroPrepareDataService
    , private errorPresentationService: ErrorPresentationService
    , private routerparams: Router
    ,private messageService: MessageService
  ) {
    this.buildForm();// Puedes inicializar date con la fecha actual o alguna otra fecha
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
        this.formRegistro.get("Valor")?.patchValue(null)
        this.formRegistro.get("Consumo")?.patchValue(null)
      }
  }

  resetearFormulaio(){
    this.formRegistro.get("Cliente")?.patchValue(null)
    // this.formRegistro.get("Fecha")?.patchValue(null)
    this.formRegistro.get("Deuda")?.patchValue(null)
    this.formRegistro.get("ConsumoAnterior")?.patchValue(null)
    this.formRegistro.get("Valor")?.patchValue(null)
    this.formRegistro.get("Consumo")?.patchValue(null)
  }

  onConsumoInputChange(event: any){

    let consumo_previo = this.formRegistro.get('ConsumoAnterior')?.value;
    let deuda = this.formRegistro.get('Deuda')?.value;

    const inputElement = event.target as HTMLInputElement;
    const valorInput = inputElement.value;

    let result = parseInt(valorInput, 10) -  parseInt(consumo_previo, 10);


    let result2 = (result  * 0.30) < 2 ? 2 : (result  * 0.30)

    result = result2 + parseInt(deuda);


    console.log(result)

    this.formRegistro.get("Valor")?.patchValue(result)

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

  queryDataToServiceRemoteConsumoPrevio(entityRequest: ConsumoPrevioRequestModel) {
    [this.codigosMessage, this.mensajesMessage] = MessageConstants;

    this.queryManagementService.getConsumoPrevio(entityRequest)
      .subscribe(
        {
          next: (data) => {
            let dataTmp = data;
            if(dataTmp.length > 0) {
              let resultado = dataTmp[0]
              this.formRegistro.get("Consumo")?.enable();
              this.formRegistro.get("ConsumoAnterior")?.patchValue(resultado.consumo)
              console.log("RESULTADO DE CONSUMO: ",resultado.consumo )
              this.formRegistro.get("Deuda")?.patchValue(resultado.deuda)

            }else{
              this.resetearFormulaio()
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

  setErrorMessages(error: any) {

    this.errorPresentationService.error = error;
    this.errorPresentationService.handleError();
  }

  buildForm(){

    const today = new Date();

    today.setMonth(today.getMonth() - 1);

    this.formRegistro = new FormGroup({
      Fecha: new FormControl(today, Validators.required),
      Cliente: new FormControl(null, Validators.required),
      ConsumoAnterior: new FormControl(null),
      Consumo: new FormControl(null, Validators.required),
      Deuda: new FormControl(null),
      Valor: new FormControl(null, Validators.required)
    });

    this.formRegistro.get("Consumo")?.disable();
    this.formRegistro.get("ConsumoAnterior")?.disable();
    this.formRegistro.get("Deuda")?.disable();
    this.formRegistro.get("Valor")?.disable();
  }

  prepareDataConsumo() {
      let createFacturacionContratoRequest = this.prepareDataService.prepareDataConsumo(this.formRegistro);
      console.log(createFacturacionContratoRequest)


      if(+createFacturacionContratoRequest.Consumo < +createFacturacionContratoRequest.ConsumoAnterior){
        this.messageService.add({severity:'error', detail: 'El consumo actual es incorrecto, o te manipularon el medidor o tomaste mal la lectura'});
        return
      }
      this.RegistrarConsumo(createFacturacionContratoRequest);
  }

  RegistrarConsumo(request: GuardarConsumoModel) {

    this.queryManagementService.createFacturacionContrato(request)
      .subscribe(
        {
          next: (data) => {
            let dataTmp = data;
            if(dataTmp) {
              if(dataTmp.status === "OK"){
                this.messageService.add({severity:'success', detail: 'Registro creado exitosamente'});
                this.resetearFormulaio()
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

  GuardarDatos(){

    if (this.formRegistro?.valid) {
        this.prepareDataConsumo();
    }else{
      this.messageService.add({severity:'error', detail: 'Todos los campos son requeridos'});
    }

  }

}
