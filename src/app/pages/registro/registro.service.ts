import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable} from "rxjs";
import { Result } from "src/app/interfaces/result";
import { environment } from "src/environments/environment";
import { ConsumoPrevioResponseModel, ClientesResponseModel,  ClientesRequestModel , ConsumoPrevioRequestModel, GuardarConsumoModel} from '../../models/consumo_previo.model';

const API_MAIN = environment.serverUrl;

@Injectable()
export class RegistroService {

    private URL_CLIENTES : string = API_MAIN + "/procedures/get_methods/getClientes.php";
    private URL_CONSUMO_PREVIO : string = API_MAIN + "/procedures/get_methods/getConsumoAnterior.php";
    private URL_REGISTRAR_CONSUMO : string = API_MAIN + "/procedures/post_methods/RegistrarConsumo.php";


    constructor(private _http: HttpClient) {}

    getClientes(request : ClientesRequestModel) : Observable<any>{

        let params = new HttpParams()
                            .set('token', request.Token ?? "")

        return this._http
                .get<Result<ClientesResponseModel>>(this.URL_CLIENTES, { params: params})
                .pipe(
                    map((res: Result<ClientesResponseModel>) => {
                        return res.body;
                    })
                );
    }

    getConsumoPrevio(request : ConsumoPrevioRequestModel) : Observable<any>{

      let params = new HttpParams()
                          .set('token', request.token ?? "")
                          .set('IdCliente', request.IdCliente ?? "")

      return this._http
              .get<Result<ConsumoPrevioResponseModel>>(this.URL_CONSUMO_PREVIO, { params: params})
              .pipe(
                  map((res: Result<ConsumoPrevioResponseModel>) => {
                      return res.body;
                  })
              );
  }


  createFacturacionContrato(request: GuardarConsumoModel) : Observable<any>{
		return this._http
      .post<Result<number>>(this.URL_REGISTRAR_CONSUMO, request)
      .pipe(
        map((res: Result<number>) => {
          return res;
        })
      );
	}
}
