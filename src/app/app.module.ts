import { NgModule , LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';

import { BadgeModule } from 'primeng/badge';

import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { RegistroService } from './pages/registro/registro.service';
import { ErrorPresentationService } from './services/errorPresentationService';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { RegistroPrepareDataService } from './pages/registro/registro-prepare-data.service';
import { ToastModule } from 'primeng/toast';
import { ReportePrepareDataService } from './pages/reporte/reporte-prepare-data.service';
import { ReporteService } from './pages/reporte/reporte.service';
import { FacturacionService } from './pages/facturacion/facturacion.service';
import { FacturacionPrepareDataService } from './pages/facturacion/facturacion-prepare-data.service';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { NgxPrintModule } from 'ngx-print';

import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './pages/login/login.service';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    IndexComponent,
    RegistroComponent,
    ReporteComponent,
    FacturacionComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    MessagesModule,
    ToastModule,
    TagModule,
    BadgeModule,
    NgxPrintModule,
    CommonModule,
    InputNumberModule,
    ConfirmDialogModule,
    PasswordModule,
    DialogModule
  ],
  providers: [
    RegistroService,
    ErrorPresentationService,
    MessageService,
    RegistroPrepareDataService,
    ReportePrepareDataService,
    ReporteService,
    FacturacionService,
    FacturacionPrepareDataService,
    LoginService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [IndexComponent]
})
export class AppModule { }
