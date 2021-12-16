import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  @Injectable({
    providedIn: 'root'
  })
export class CsvserviceService {
  public host:string="http://localhost:8080" ;

  constructor(private httpClient:HttpClient) { }

  public SaveCsv(body:any){
    return this.httpClient.post(this.host+"/addemp",body);
  }
  public SaveDetails(body:any){
    return this.httpClient.post(this.host+"/addDetails",body);
  }
  public SaveHours(body:any){
    return this.httpClient.post(this.host+"/addHours",body);
  }
  public gethours(){
    return this.httpClient.get(this.host+"/hours");
  }
  public deletehours(value:any){
    return this.httpClient.delete(this.host+"/hours/"+value);
  }
  public filter(value:any,page:number,size:number){
    return this.httpClient.get(this.host+"/hours/search/byDatePage?date="+value+"&page="+page+"&size="+size);
  }
  public GetHours(value:any){
    return this.httpClient.get(this.host+"/hours/search/byDate?date="+value);
  }
}
