import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable} from "rxjs";
import { Result } from "src/app/interfaces/result";
import { environment } from "src/environments/environment";
import { LoginModelRequest, LoginModelResponse } from "./login.model";

const API_MAIN = environment.serverUrl;
console.log(API_MAIN)

@Injectable()
export class LoginService {


    private URL_LOGIN : string = API_MAIN + "/procedures/get_methods/login.php";
    constructor(private _http: HttpClient) {}

    getLogin(request : LoginModelRequest) : Observable<any>{

        console.log(this.URL_LOGIN)

        let params = new HttpParams()
                            .set('token', request.token ?? "")
                            .set('userName', request.userName ?? "")
                            .set('userPassword', request.userPassword ?? "")

        return this._http
                .get<Result<LoginModelResponse>>(this.URL_LOGIN, { params: params})
                .pipe(
                    map((res: Result<LoginModelResponse>) => {
                        return res.body;
                    })
                );
    }

}
