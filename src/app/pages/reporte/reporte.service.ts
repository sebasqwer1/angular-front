import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable} from "rxjs";
import { Result } from "src/app/interfaces/result";
import { environment } from "src/environments/environment";
import { ConsumoPrevioResponseModel, ClientesResponseModel,  ClientesRequestModel , ConsumoPrevioRequestModel} from '../../models/consumo_previo.model';
import { ActualizarPagoRequestModel } from "src/app/models/reporte-model";

const API_MAIN = environment.serverUrl;

@Injectable()
export class ReporteService {

    private URL_CLIENTES : string = API_MAIN + "/procedures/get_methods/getClientes.php";
    private URL_DEUDAS : string = API_MAIN + "/procedures/get_methods/getDeudas.php";
    private URL_ACTUALIZAR_PAGO : string = API_MAIN + "/procedures/post_methods/ActualizarPago.php";


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

    getDeudas(request : ConsumoPrevioRequestModel) : Observable<any>{

      let params = new HttpParams()
                          .set('token', request.token ?? "")
                          .set('IdCliente', request.IdCliente ?? "")

      return this._http
              .get<Result<ConsumoPrevioResponseModel>>(this.URL_DEUDAS, { params: params})
              .pipe(
                  map((res: Result<ConsumoPrevioResponseModel>) => {
                      return res.body;
                  })
              );
  }


  ActualizarPago(request: ActualizarPagoRequestModel) : Observable<any>{
		return this._http
      .post<Result<number>>(this.URL_ACTUALIZAR_PAGO, request)
      .pipe(
        map((res: Result<number>) => {
          return res;
        })
      );
	}
}
