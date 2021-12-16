import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { CatalogueService } from '../services/catalogue.service';
import { ExportService } from '../services/export.service';
import { ProduitsService } from '../services/produits.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public Produits:any;
  public emp:any;
  public newdata:any; 
  public n:boolean=false;
  public l:boolean=false;
  public a:boolean=false;
  public f:boolean=false;
  public update:boolean=false;
  public updated:boolean=false;
  
  public size:number=2;
  public currentPage:number=0;
  public totalPages:any;
  public pages:Array<number> |undefined ;
  public currentKeyword:String="";
  private headers:Array<string> =["Id","First Name","Last Name","Age","Name"];
  private data:Array<string> =[];
  constructor(private produitseservice:ProduitsService,private fb:FormBuilder,private Toastr:AlertsService,private exportservice:ExportService,private router:Router,public authentificationService:AuthentificationService) { }
  registrationForm= this.fb.group({
    name:['aa'],
    first_name:[''],
    last_name:[''],
    age:['']
  })

  ngOnInit(){
    if(!this.authentificationService.isAuthenticated){
      this.router.navigate(["Login"]);
    }
  }
  onGetProduits(){
    this.produitseservice.getProduits(this.currentPage, this.size)
    .subscribe(data=>{ 
      this.Produits=data;
      this.totalPages=this.Produits["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
      console.log(this.totalPages);
      
    },err=>{
      console.log(err);
    })
  }

  onPageProduits(i:number){
    this.currentPage=i;
    this.Chercher();
  }
  onChercher(value:any){
    this.update=false;
    this.currentKeyword=value.Keyword;
    this.currentPage=0;
    this.Chercher();
  }
  Chercher(){
    this.produitseservice.search(this.currentKeyword,this.currentPage, this.size)
    .subscribe(data=>{
      this.Produits=data;
      console.log(this.Produits["_embedded"]["produits"].length);
      this.totalPages=this.Produits["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
    },err=>{
      console.log(err);
    })
  }
  DeleteProduit(E:any){
    let conf=confirm("Etes vous sure?")
    console.log(E);
    if(conf){
      this.produitseservice.DeleteProduit(E._links.self.href)
      .subscribe(data=>{
        this.Chercher();
      },err=>{
        console.log(err);
      })
    }
  }
  UpdateProduit(E:any){
    this.n=false;
    this.l=false;
    this.a=false;
    this.f=false;
    this.updated=false;
    this.emp=E;
    this.update=true;
    this.produitseservice.getProduit(E._links.self.href)
    .subscribe(data=>{ 
      this.newdata=data;
      
    },err=>{
      console.log(err);
    })
    this.registrationForm.patchValue({
      name:E.name,
      first_name:E.first_name,
      last_name:(E.last_name),
      age:(E.age)
      
    })

  }
  Clear(){
    this.registrationForm.patchValue({
      name:'',
      first_name:'',
      last_name:(''),
      age:('')
      
    })
  }
  Annuler(){
    this.update=false;
  }
  Update() {
    
    if(this.registrationForm.value["name"]==''){
      this.n=true;
      this.Toastr.showError('Name required', 'Erreur'); }
   else{if(this.registrationForm.value["prix"]==0){
     this.f=true;
     this.Toastr.showError('Price required', 'Erreur'); }
     else{if(this.registrationForm.value["quantite"]==0){
       this.l=true;
       this.Toastr.showError('Quatity required', 'Erreur'); }
      
       else{
    this.produitseservice.Update(this.emp.id,this.registrationForm.value)
    .subscribe(data=>{
      this.Toastr.showSuccess('produits Updated Successfully','Success');

      this.Clear();
      this.Chercher();
      
    },err=>{
      console.log(err);

    })
  }

}}}
export(){
  this.data=[];
  this.Toastr.showSuccess('File Downloaded Successfully','Success');
  for(let i = 0; i < this.Produits["_embedded"]["Produits"].length; i++){
    this.data.push(this.Produits["_embedded"]["Produits"][i]);
    }
    console.log(this.data);
  this.exportservice.export(this.data,"ExportedCSV");
  
}  
}
