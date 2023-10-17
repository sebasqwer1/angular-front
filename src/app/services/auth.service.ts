// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import { LoginModelRequest } from '../pages/login/login.model';
import { ErrorPresentationService } from './errorPresentationService';
import { LoginService } from '../pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  codigosMessage: any;
  mensajesMessage: any;

  usuario: any = []

  constructor(
    private errorPresentationService: ErrorPresentationService,
    private queryManagementService: LoginService
  ) {

  }

  async queryDataToServiceRemoteCliente(entityRequest: LoginModelRequest): Promise<any> {
    try {
      const data = await this.queryManagementService.getLogin(entityRequest).toPromise();
      return data;
    } catch (error) {
      this.errorPresentationService.error = error;
      this.errorPresentationService.handleError();
      return [];
    }
  }

  // Método para iniciar sesión
  async login(username: string, password: string) {

    let request: LoginModelRequest = {
      token: "015ec0d618fe3fa9c7d0a1abda2b159c",
      userName: username,
      userPassword: password
    }
    const Respuesta = await this.queryDataToServiceRemoteCliente(request)

    const isAuthenticated = Respuesta.length > 0 ;

    this.isLoggedInSubject.next(isAuthenticated);

    return isAuthenticated;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  // Método para verificar el estado de autenticación
  isAuthenticated(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
