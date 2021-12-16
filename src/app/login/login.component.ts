import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Sign } from '../Model/sign';
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authentificationService:AuthentificationService) { }
  signInForm= this.fb.group({
    username:[''],
    password:['']
  })

  ngOnInit(): void {
  }
  onSubmit(){
    const signInData = new Sign(this.signInForm.value["username"],this.signInForm.value["password"]);
    this.authentificationService.authenticate(signInData);
  }
}
