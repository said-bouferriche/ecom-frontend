import { Component, OnInit } from '@angular/core';
import {ProductService} from "../_services/product.service";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ShowProductImagesDialogComponent} from "../show-product-images-dialog/show-product-images-dialog.component";
import {ImageProcessingService} from "../image-processing.service";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  pageNumber:number=0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['productId', 'productName', 'description',
    'productActualPrice','productDiscountedPrice','Actions'];

  constructor(private productService:ProductService,
              private dialog:MatDialog,
              private imageProcessingService: ImageProcessingService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    // this.showImages();
  }

  public getAllProducts(){
    this.productService.getAllProducts(this.pageNumber).pipe(
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

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      (res)=>{
        this.getAllProducts();
        console.log(res);
      },(error:HttpErrorResponse)=>{
        console.log(error);
    }
    )
  }

  showImages(element:any) {
    console.log(element)
    this.dialog.open(ShowProductImagesDialogComponent, {
      height : '500px',
      width:'800px',
      data: {
        images: element.productImages
      },
    });
  }

  editProductDetails(productId: number) {
    this.router.navigate(["/addNewProduct", {productId: productId}])
  }
}
