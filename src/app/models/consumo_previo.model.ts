export interface ClientesRequestModel {
  Token: string
}

export interface ClientesResponseModel {
  Token: string
}


// PENDIENTE DE LLENADO

export interface ConsumoPrevioRequestModel {
  token: string,
  IdCliente: number
}


export interface ConsumoPrevioResponseModel {
  Token: string,
  IdCliente: number
}



// CREACION

export interface GuardarConsumoModel {
  Token: string,
  IdCliente: number
  Periodo: string,
  Consumo: number,
  ConsumoAnterior: number,
  Valor: number,
  Deuda: number
}

export interface ReporteConsumoModel {
  Token: string,
  IdCliente: number
  Periodo: string,
  Consumo: number,
  ConsumoAnterior: number,
  Valor: number
}

