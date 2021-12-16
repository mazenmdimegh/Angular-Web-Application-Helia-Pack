import { Injectable } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private options = { 
    
    fieldSeparator: ';',

    showLabels: true, 


    useBom: true,
    
    eol: '\n',
    headers: ["Id","First Name","Last Name","Age","Name"]
  };
  constructor() { }
  public export(data:any,filename:string){
    
    new ngxCsv(data, filename, this.options);
  }
}
