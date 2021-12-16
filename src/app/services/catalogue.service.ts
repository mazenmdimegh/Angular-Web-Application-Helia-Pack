import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private httpClient: HttpClient) { }
  public getProduct(){
    return this.httpClient.get("http://localhost:8080/produits")
  }
}
