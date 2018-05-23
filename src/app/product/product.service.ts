import { IProduct } from './product';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {map, tap} from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {
    //Determines where HTTP requests are made
    private _productUrl = './api/products/products.json'

    //Constructor with HTTP Service passed in as a private paramaeter/class member
    //Http service is a dependecy injection
    constructor(private _http: HttpClient) {

    }
    getProducts(): Observable<IProduct[]> {
        //Returns products from HTTP GET request, sets expected response as an array of products (interface)
        return this._http.get<IProduct[]>(this._productUrl)
        //Makes JSON readable
        .do(data => console.log('All: ' + JSON.stringify(data)))
        //Handles error
        .catch(this.handleError);
    };

    getProduct(id: number): Observable<IProduct> {
        //Returns products from HTTP GET request, sets expected response as an array of products (interface)
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id)));
    };

    //Error handling method
    //Outputs to console log and returns observable object with error
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}