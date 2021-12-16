import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddemployeComponent } from './addemploye/addemploye.component';
import { CsvComponent } from './csv/csv.component';
import { Csv2Component } from './csv2/csv2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeComponent } from './employe/employe.component';
import { LoginComponent } from './login/login.component';
import { NouveauProduitsComponent } from './nouveau-produits/nouveau-produits.component';
import { ProduitsComponent } from './produits/produits.component';

const routes: Routes = [
  {path:'',redirectTo:"Login",pathMatch:'full'},
  {path:"produits",component:ProduitsComponent},
  {path:"nouveau-produit",component:NouveauProduitsComponent} ,
  {path:"employes",component:EmployeComponent},
  {path:"addemploye",component:AddemployeComponent},
  {path:"csv",component:CsvComponent},
  {path:"Dashboard",component:DashboardComponent},
  {path:"Login",component:LoginComponent},
  {path:"csv2",component:Csv2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
