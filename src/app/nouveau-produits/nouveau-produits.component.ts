import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-nouveau-produits',
  templateUrl: './nouveau-produits.component.html',
  styleUrls: ['./nouveau-produits.component.css']
})

export class NouveauProduitsComponent implements OnInit {
  public succes:boolean=false;
  public n:boolean=false;
  public l:boolean=false;
  public a:boolean=false;
  public f:boolean=false;
  private body:String="";
  constructor(private produitService:ProduitsService, private fb:FormBuilder, private toastr: AlertsService,private router:Router,public authentificationService:AuthentificationService) { }

  registrationForm= this.fb.group({
    name:[''],
    prix:[''],
    quantite:['']
  })

  age = this.registrationForm.value["age"];
  ngOnInit(): void {
    if(!this.authentificationService.isAuthenticated){
      this.router.navigate(["Login"]);
    }
  }

  AddProd(){
    this.n=false;
    this.f=false;
    this.l=false;
    this.a=false;
    if(this.registrationForm.value["name"]==''){
       this.n=true;
       this.toastr.showError('Name required', 'Erreur'); }
    else{if(this.registrationForm.value["prix"]==0){
      this.f=true;
      this.toastr.showError('Price required', 'Erreur'); }
      else{if(this.registrationForm.value["quantite"]==0){
        this.l=true;
        this.toastr.showError('Last Name required', 'Erreur'); }
       
        else{   
   
   this.produitService.AddProd(this.registrationForm.value)
    .subscribe(data=>{
      this.toastr.showSuccess('Success', 'produit added successfuly');
      this.succes=true;
      this.Clear();
      
    },err=>{
      console.log(err);

    })
  }}}}
  Clear(){
    this.succes=false;
    this.registrationForm.patchValue({
      name:'',
      prix:'',
      quantite:('')
      
    })
  }

}
