import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  title='employeFront'
  public name:String="";
  constructor(private router: Router,public authentificationService:AuthentificationService) { }
  
  ngOnInit(){
  this.name=this.authentificationService.profileName;
  console.log(this.name);
    }
  

}
