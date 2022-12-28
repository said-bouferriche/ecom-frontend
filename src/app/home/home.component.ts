import {Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {ProductService} from "../_services/product.service";
import {map} from "rxjs";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageProcessingService} from "../image-processing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNumber: number=0;
  showLoadButton = true;
  productDetails: Product[] = [];

  constructor(private productService: ProductService,
              private imageProcessingService:ImageProcessingService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts(this.pageNumber).pipe(
      map((x:Product[], i)=>x.map((product: Product)=>
        this.imageProcessingService.createImages(product)))
    ).subscribe(
      (res:Product[])=>{
        res.forEach(p=>{
          this.productDetails.push(p);
        })

        if(this.productDetails.length == 7){
          this.showLoadButton = false;
        }else {
          this.showLoadButton = true;
        }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }


  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails',{productId:productId}])
  }

  loadMoreProducts() {
    this.pageNumber = this.pageNumber +1;
    this.getAllProducts();
  }
}
