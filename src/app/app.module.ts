import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { NouveauProduitsComponent } from './nouveau-produits/nouveau-produits.component';
import {HttpClientModule} from '@angular/common/http';
import { EmployeComponent } from './employe/employe.component';
import { AddemployeComponent } from './addemploye/addemploye.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CsvComponent } from './csv/csv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Csv2Component } from './csv2/csv2.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
import { AuthentificationService } from './services/authentification/authentification.service';
@NgModule({
  declarations: [
    
    AppComponent,
    ProduitsComponent,
    NouveauProduitsComponent,
    EmployeComponent,
    AddemployeComponent,
    MenuComponent,
    CsvComponent,
    DashboardComponent,
    LoginComponent,
    Csv2Component,
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
