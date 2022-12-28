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
  showLoadButton = true;
  pageNumber:number=0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['productId', 'productName', 'description',
    'productActualPrice','productDiscountedPrice','Actions'];
  showTable = true;

  constructor(private productService:ProductService,
              private dialog:MatDialog,
              private imageProcessingService: ImageProcessingService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    // this.showImages();
  }

  public getAllProducts(searchKey:string = ""){
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey).pipe(
      map((x:Product[], i)=>x.map((product: Product)=>
        this.imageProcessingService.createImages(product)))
    ).subscribe(
      (res:Product[])=>{
        this.showTable = true;


        res.forEach(p=>{
          this.productDetails.push(p);
        })


        if(this.productDetails.length == 7){
          this.showLoadButton = false;
        }else {
          this.showLoadButton = true;
        }


        //
        // this.productDetails = res;
        // console.log(res);
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

  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword) {
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }
}
