import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/products']);
            // abort current navigation
            return false;
        }
        return true;
    }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

    public canDeactivate(component: ProductEditComponent): boolean {
        if (component.productForm.dirty) {
            let productName = component.productForm.get('productName').value || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}
