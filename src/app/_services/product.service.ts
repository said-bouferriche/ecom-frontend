import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../_model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_PATH = "http://localhost:9090";
  constructor(private httpClient: HttpClient) { }

  public addProduct(product: Product){
    return this.httpClient.post<Product>(this.API_PATH +"/addNewProduct", product);
  }
}
