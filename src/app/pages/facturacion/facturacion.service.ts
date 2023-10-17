import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable} from "rxjs";
import { Result } from "src/app/interfaces/result";
import { environment } from "src/environments/environment";
import { FacturacionRequestModel, FacturacionResponseModel } from "src/app/models/facturacion.model";

const API_MAIN = environment.serverUrl;

@Injectable()
export class FacturacionService {

    private URL_FACTURAS : string = API_MAIN + "/procedures/get_methods/getFacturas.php";

    constructor(private _http: HttpClient) {}

    getFacturas(request : FacturacionRequestModel) : Observable<any>{

        let params = new HttpParams()
                            .set('Token', request.Token ?? "")
                            .set('Fecha', request.Fecha ?? "")

        return this._http
                .get<Result<FacturacionResponseModel>>(this.URL_FACTURAS, { params: params})
                .pipe(
                    map((res: Result<FacturacionResponseModel>) => {
                        return res.body;
                    })
                );
    }

}
