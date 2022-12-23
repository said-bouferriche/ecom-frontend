import {Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {ProductService} from "../_services/product.service";
import {map} from "rxjs";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageProcessingService} from "../image-processing.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];

  constructor(private productService: ProductService,
              private imageProcessingService:ImageProcessingService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts().pipe(
      map((x:Product[], i)=>x.map((product: Product)=>
        this.imageProcessingService.createImages(product)))
    ).subscribe(
      (res:Product[])=>{
        this.productDetails = res;
        console.log(res);
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }


}
