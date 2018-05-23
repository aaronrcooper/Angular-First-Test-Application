import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ProductGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot) : boolean {
    //Checks if ID is valid
    let id = +route.url[1].path;
    if (isNaN(id) || id <1) {
      alert("Invalid product id");
      this._router.navigate(['/product']);
      return false;
    }
    return true;
  }
  constructor(private _router: Router) { }

}
