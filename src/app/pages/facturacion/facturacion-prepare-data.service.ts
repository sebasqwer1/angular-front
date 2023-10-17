import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {GuardarConsumoModel} from '../../models/consumo_previo.model';

@Injectable()
export class FacturacionPrepareDataService {

  prepareDataConsumo(form: FormGroup): GuardarConsumoModel {

    const fechaOriginal = new Date(form?.get('Fecha')?.value);
    const anio = fechaOriginal.getFullYear();
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en Date son base 0
    const fechaNueva = `${anio}-${mes}`;

    return {
      Token: "015ec0d618fe3fa9c7d0a1abda2b159c",
      IdCliente: form?.get('Cliente')?.value.code ? form?.get('Cliente')?.value.code: undefined,
      Periodo: fechaNueva ,
      Consumo: form?.get('Consumo')?.value ? form?.get('Consumo')?.value : undefined,
      ConsumoAnterior: form?.get('ConsumoAnterior')?.value ? form?.get('ConsumoAnterior')?.value : undefined,
      Valor: form?.get('Valor')?.value ? form?.get('Valor')?.value : undefined,
      Deuda: form?.get('Deuda')?.value ? form?.get('Deuda')?.value : undefined,
    };
  }
}
