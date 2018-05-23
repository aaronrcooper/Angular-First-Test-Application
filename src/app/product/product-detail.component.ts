import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IProduct} from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = "Product Detail";
  product: IProduct;
  //Constructor
  constructor(private _route: ActivatedRoute, 
    private _router: Router, 
    private _productService: ProductService) {
   }
   //Angular Oninit method
  ngOnInit() {
    //Gets id from URL
    let id = +this._route.snapshot.paramMap.get('id');
    //Calls the get product method
    this.getProduct(id);
  }

  getProduct(id: number) {
    //Gets the product by the id using a service request and subscription
    return this._productService.getProduct(id).subscribe(product => this.product = product);
  }
  //Allows the user to navigate to the last page (products)
  onBack() : void {
    this._router.navigate(['/product']);
  }

}
