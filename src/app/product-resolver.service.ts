import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "./_model/product.model";
import {map, Observable, of} from "rxjs";
import {ProductService} from "./_services/product.service";
import {ImageProcessingService} from "./image-processing.service";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product>{

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>{
    // @ts-ignore
    const id = +route.paramMap.get("productId");

    if (id){
      return this.productService.getProductDetailsById((id))
        .pipe(
          map(p=> this.imageProcessingService.createImages(p))
        )
        ;
    }
    else {
      return of(this.getProductDetails());

    }

    }
    getProductDetails(){
      return {
        productId: null,
        productName: "",
        productDescription: "",
        productDiscountedPrice: 0,
        productActualPrice: 0,
        productImages: []
      };
  }
}
