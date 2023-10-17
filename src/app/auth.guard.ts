import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/Login']); // Redirecciona a la pantalla de inicio de sesión si no está autenticado
      return false;
    }
  }
}
