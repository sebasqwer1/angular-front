import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { IndexComponent } from './pages/index/index.component';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Registro',
    canActivate: [AuthGuard],
    component: RegistroComponent
  },
  {
    path: 'Regularizar',
    canActivate: [AuthGuard],
    component: ReporteComponent
  },
  {
    path: 'Facturar',
    canActivate: [AuthGuard],
    component: FacturacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
