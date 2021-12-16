import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sign } from 'src/app/Model/sign';
import { AlertsService } from '../alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private readonly mockedUser= new Sign('halima','1234')
  private readonly mockedUser2= new Sign('admin','1234')
  isAuthenticated=false;
  public profileName:String="";
  constructor(private router:Router,private toastr: AlertsService) { }
  authenticate(signInData:Sign):boolean{
    if(this.checkCredentials(signInData)){
      this.isAuthenticated = true;
      this.router.navigate(['Dashboard'])
      return true;
    }else{
      this.toastr.showError('wrong Username or Password', 'Erreur');
    }

    this.isAuthenticated=false;
    this.profileName="login";
    return false;
  }
  private checkCredentials(signInData:Sign):boolean{
    if( this.checkUsename(signInData.getUsename())&& this.checkPassword(signInData.getPassword())){
      this.profileName="Halima Sayah";
      return true;
    }if(this.checkUsename2(signInData.getUsename())&& this.checkPassword2(signInData.getPassword())){
      this.profileName="admin";
      return true;
    }return false;
  }
  private checkUsename(username:string):boolean{
    return username===this.mockedUser.getUsename(); 
  }
  private checkPassword(password:string):boolean{
    return password===this.mockedUser.getPassword();
  }
  private checkUsename2(username:string):boolean{
    return username===this.mockedUser2.getUsename(); 
  }
  private checkPassword2(password:string):boolean{
    return password===this.mockedUser2.getPassword();
  }
}
