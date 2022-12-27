import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderDetails} from "../_model/order-details.models";
import {OrderQuantity} from "../_model/order-quantity.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../_model/product.model";
import {ProductService} from "../_services/product.service";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  productDetails : Product[] = [];

  orderDetails:OrderDetails = {
    fullName:'',
    fullAddress:'',
    contactNumber:'',
    alternateContactNumber:'',
    orderProductQuantityList:[]
  };

  constructor(private activatedRoute:ActivatedRoute,
              private productService: ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails1'];

    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    );
    console.log(this.orderDetails);
    console.log(this.productDetails);


  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirmation"]);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getQuantityForProduct(productId: number) {

    const filterProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    )

    return filterProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number) {
    const filterProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    )

    return filterProduct[0].quantity*productDiscountedPrice;
  }

  onQuantityChanged(q: string, productId: number) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId === productId
    )[0].quantity = Number(q);
    console.log(q);
  }

  getCalculatedTotalPrice() {
    let Total = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price =  this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        Total = Total + price * productQuantity.quantity;
      }
    );
    return Total;
  }
}
