import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { removeProductFromCart } from '../store/products.actions';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/products.reducer';
import { getProductsInCart } from "../store/products.selectors";
import { Product } from '../models/product';
import { ClearObservable } from '../common/clear-observable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends ClearObservable implements OnInit {
  products: Product[];
  constructor(private readonly store: Store<ProductState>, private readonly location: Location) {
    super();
   }

  ngOnInit() {
    this.loadProductInCard();
  }

  private loadProductInCard() {
    this.store.select(getProductsInCart).pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.products = products;
      if (products.length === 0) {
        this.location.back();
      }
    });
  }

  private navigateToList() {
    this.location.back();
  }

  removeProductFromCart(productId: string): void {
    this.store.dispatch(removeProductFromCart({productId}));
  }
}
