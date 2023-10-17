export interface FacturacionRequestModel {
  Token: string,
  Fecha: string
}

export interface FacturacionResponseModel {
  Cliente: string,
  Periodo: string,
  Consumo: number,
  valor: number
}

