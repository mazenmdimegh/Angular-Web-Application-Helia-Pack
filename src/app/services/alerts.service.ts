import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

 showSuccess(message:any,erreur:string){
 return this.toastr.success(message , erreur);
}
showError(message:any, title:any){
  this.toastr.error(message, title)
}

showInfo(message:any, title:any){
  this.toastr.info(message, title)
}

showWarning(message:any, title:any){
  this.toastr.warning(message, title)
}
}