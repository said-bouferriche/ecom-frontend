import { Component, OnInit } from '@angular/core';
import {Product} from "../_model/product.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectedProductIndex = 0;

  product: Product;
  constructor(private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(i: number) {
    this.selectedProductIndex = i;
  }

  buyProduct(productId: number) {
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,
      id:productId}]);
  }

  addToCart(productId: number) {
    
  }
}
