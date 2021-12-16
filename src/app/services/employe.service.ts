import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  public host:string="http://localhost:8080" ;

  constructor(private httpClient:HttpClient) { }
  public getEmployes(page:number,size:number){
    return this.httpClient.get(this.host+"/employes?page="+page+"&size="+size);

  }
  public getEmploye(url:string){
    return this.httpClient.get(url);

  }
  public Update(id:string,body:any){
    return this.httpClient.put(this.host+"/employes/"+id,body);
  }
  //http://localhost:8080/employes/search/byNamePage?mc=m&page=0&size=2
  public search(value:any,page:number,size:number){
    return this.httpClient.get(this.host+"/employes/search/byNamePage?mc="+value+"&page="+page+"&size="+size);
  }
  public DeleteEmploye(ref:any){
    return this.httpClient.delete(ref);
  }
  public AddEmp(body:any){
    return this.httpClient.post(this.host+"/addemp",body);
  }
  
}
