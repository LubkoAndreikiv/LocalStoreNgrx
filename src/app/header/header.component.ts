import { ClearObservable } from './../common/clear-observable';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/products.reducer';
import { getProductsInCart } from "../store/products.selectors";
import { Product } from '../models/product';
import {Location} from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ClearObservable implements OnInit {

  products: Product[];

  constructor(private readonly store: Store<ProductState>,
              private router: Router) { super(); }

  ngOnInit() {
    this.store.select(getProductsInCart).pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.products = products;
    });
  }

  showCart(): void {
    this.router.navigateByUrl('/cart');
  }

  isCartEmpty(): boolean {
    return this.products.length === 0;
  }
}
