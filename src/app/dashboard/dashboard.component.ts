import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,public authentificationService:AuthentificationService) { }

  ngOnInit(): void {
    if(!this.authentificationService.isAuthenticated){
      this.router.navigate(["Login"]);
    }
  }

}
