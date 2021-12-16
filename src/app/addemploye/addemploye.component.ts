import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeService } from '../services/employe.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsService } from '../services/alerts.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-addemploye',
  templateUrl: './addemploye.component.html',
  styleUrls: ['./addemploye.component.css']
})
export class AddemployeComponent  {
  public succes:boolean=false;
  public n:boolean=false;
  public l:boolean=false;
  public a:boolean=false;
  public f:boolean=false;
  private body:String="";
/*   registrationForm= new FormGroup({
    first_name : new FormControl('ss'),
    last_name: new FormControl(''),
    age:new FormControl('')
  }); */
  constructor(private employeservice:EmployeService, private fb:FormBuilder, private toastr: AlertsService,private router:Router,public authentificationService:AuthentificationService) { }
  
  registrationForm= this.fb.group({
    name:[''],
    first_name:[''],
    last_name:[''],
    age:['']
  })

  age = this.registrationForm.value["age"];
  ngOnInit(): void {
    if(!this.authentificationService.isAuthenticated){
      this.router.navigate(["Login"]);
    }
  }

  Addemp(){
    this.n=false;
    this.f=false;
    this.l=false;
    this.a=false;
    if(this.registrationForm.value["name"]==''){
       this.n=true;
       this.toastr.showError('Name required', 'Erreur'); }
    else{if(this.registrationForm.value["first_name"]==""){
      this.f=true;
      this.toastr.showError('First Name required', 'Erreur'); }
      else{if(this.registrationForm.value["last_name"]==""){
        this.l=true;
        this.toastr.showError('Last Name required', 'Erreur'); }
        else{if(this.registrationForm.value["age"]==0){
          this.a=true; 
          this.toastr.showError('Age required', 'Erreur');}
        else{   
   console.log( this.registrationForm.value); 

    this.employeservice.AddEmp(this.registrationForm.value)
    .subscribe(data=>{
      this.toastr.showSuccess('Success', 'Employe addes successfuly');
      this.succes=true;
      this.Clear();
      
    },err=>{
      console.log(err);

    })
  }}}}}
  Clear(){
    this.succes=false;
    this.registrationForm.patchValue({
      name:'',
      first_name:'',
      last_name:(''),
      age:('')
      
    })
  }
}
