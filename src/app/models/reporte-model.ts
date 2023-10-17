export interface ClientesRequestModel {
  Token: string
}


export interface ActualizarPagoRequestModel {
  Token: string,
  IdConsumo: number,
  IdCliente: number,
  Valor: string,
  ValorPagado: number,
  Deuda : number
}



export interface GuardarConsumoModel {
  Token: string,
  IdCliente: number
  Periodo: string,
  Consumo: number,
  ConsumoAnterior: number,
  Valor: number
}


