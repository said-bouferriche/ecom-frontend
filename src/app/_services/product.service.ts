import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../_model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_PATH = "http://localhost:9090";
  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>(this.API_PATH +"/addNewProduct", product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>(this.API_PATH + "/getAllProducts")
  }

  public deleteProduct(productId: number){
    return this.httpClient.delete(this.API_PATH + "/deleteProductDetails/" + productId)
  }

  public getProductDetailsById(productId: number){
    return this.httpClient.get<Product>(this.API_PATH + "/getProductDetailsById/" + productId)

  }

}
