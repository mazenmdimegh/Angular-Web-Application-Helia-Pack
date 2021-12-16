import { Injectable } from '@angular/core';
import { ngxCsv } from 'ngx-csv';

@Injectable({
  providedIn: 'root'
})
export class Export2Service {
  private options = { 
    
    fieldSeparator: ';',

    showLabels: true, 


    useBom: true,
    
    eol: '\n',
    headers: ["Id","NoId","Name","Date","hours","No"]
  };
  constructor() { }
  public export(data:any,filename:string){
    
    new ngxCsv(data, filename, this.options);
  }
}
