import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../services/employe.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../services/alerts.service';
import { ExportService } from '../services/export.service';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  public emp:any;
  public newdata:any; 
  public n:boolean=false;
  public l:boolean=false;
  public a:boolean=false;
  public f:boolean=false;
  public update:boolean=false;
  public updated:boolean=false;
  public employes:any;
  public size:number=10;
  public currentPage:number=0;
  public totalPages:any;
  public pages:Array<number> |undefined ;
  public currentKeyword:String="";
  private headers:Array<string> =["Id","First Name","Last Name","Age","Name"];
  private data:Array<string> =[];
  constructor(private employeservice:EmployeService,private fb:FormBuilder,private Toastr:AlertsService,private exportservice:ExportService,private router:Router,public authentificationService:AuthentificationService) { }
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
  onGetEmployes(){
    this.employeservice.getEmployes(this.currentPage, this.size)
    .subscribe(data=>{ 
      this.employes=data;
      this.totalPages=this.employes["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
      
    },err=>{
      console.log(err);
    })
  }

  onPagesEmploye(i:number){
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
    this.employeservice.search(this.currentKeyword,this.currentPage, this.size)
    .subscribe(data=>{
      this.employes=data;
      console.log(this.employes["_embedded"]["employes"].length);
      this.totalPages=this.employes["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
    },err=>{
      console.log(err);
    })
  }
  DeleteEmploye(E:any){
    let conf=confirm("Etes vous sure?")
    console.log(E);
    if(conf){
      this.employeservice.DeleteEmploye(E._links.self.href)
      .subscribe(data=>{
        this.Chercher();
      },err=>{
        console.log(err);
      })
    }
  }
  UpdateEmploye(E:any){
    this.n=false;
    this.l=false;
    this.a=false;
    this.f=false;
    this.updated=false;
    this.emp=E;
    this.update=true;
    this.employeservice.getEmploye(E._links.self.href)
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
   else{if(this.registrationForm.value["first_name"]==""){
     this.f=true;
     this.Toastr.showError('First Name required', 'Erreur'); }
     else{if(this.registrationForm.value["last_name"]==""){
       this.l=true;
       this.Toastr.showError('Last Name required', 'Erreur'); }
       else{if(this.registrationForm.value["age"]==0){
         this.a=true; 
         this.Toastr.showError('Age required', 'Erreur');}
       else{
    this.employeservice.Update(this.emp.id,this.registrationForm.value)
    .subscribe(data=>{
      this.Toastr.showSuccess('Employe Updated Successfully','Success');

      this.Clear();
      this.Chercher();
      
    },err=>{
      console.log(err);

    })
  }

}}}}
export(){
  this.data=[];
  this.Toastr.showSuccess('File Downloaded Successfully','Success');
  for(let i = 0; i < this.employes["_embedded"]["employes"].length; i++){
    this.data.push(this.employes["_embedded"]["employes"][i]);
    }
    console.log(this.data);
  this.exportservice.export(this.data,"ExportedCSV");
  
}
}
