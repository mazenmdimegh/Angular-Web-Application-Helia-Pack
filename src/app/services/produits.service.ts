import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  public host:string="http://localhost:8080" ;

  constructor(private httpClient:HttpClient) { }
  public getProduits(page:number,size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);

  }
  public getProduit(url:string){
    return this.httpClient.get(url);

  }
  public Update(id:string,body:any){
    return this.httpClient.put(this.host+"/employes/"+id,body);
  }
  //http://localhost:8080/employes/search/byNamePage?mc=m&page=0&size=2
  public search(value:any,page:number,size:number){
    return this.httpClient.get(this.host+"/produits/search/byNamePage?mc="+value+"&page="+page+"&size="+size);
  }
  public DeleteProduit(ref:any){
    return this.httpClient.delete(ref);
  }
  public AddProd(body:any){
    return this.httpClient.post(this.host+"/produits",body);
  }
  
}
