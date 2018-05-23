import { ProductService } from './product.service';
import {Component, OnInit} from '@angular/core';
import {IProduct} from './product'
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: [
        './product-list.component.css'
    ]
})

export class ProductListComponent  implements OnInit{
    pageTitle: string = "Product List";
    //Determines image patterns
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    //Private variables
    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    //Array of any data type when we dont know the data type.
    products: IProduct[] = [];
    errorMessage: string;
    
    //Constructor 
    constructor(private _productService : ProductService) {
        this.listFilter = '';
    }
    //Toggles the image
    toggleImage() : void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        //Uses the HTTP get request to get the Response and place the data into the arrays
        this._productService.getProducts()
            .subscribe(products =>  {
                this.products = products;
                this.filteredProducts = this.products;                        
            },
            error => this.errorMessage = <any> error
            );
        // console.log("*hacker voice* I'm in");
    }

    performFilter(filter: string) : IProduct[] {
        filter = filter.toLocaleLowerCase();
        //Returns all products whose product name contains the 
        //searched string
        return this.products.filter((product:IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filter) !== -1);
    }
    onRatingClicked(message: string) : void {
        this.pageTitle = 'Product List: ' + message;
    }
}