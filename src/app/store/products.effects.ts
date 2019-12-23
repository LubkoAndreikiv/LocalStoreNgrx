import { ToastrModule } from 'ngx-toastr';
import { Product } from './../models/product';
import { ProductsService } from '../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProductDetailsById, getProductDetailsByIdFail, getProductDetailsByIdSuccess, addProductToCart, removeProductFromCart } from './products.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  getProductDetailsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductDetailsById),
      map(action => action.id),
      switchMap((id) => {
        return this.service.getProduct(id)
          .pipe(
            map(resp => getProductDetailsByIdSuccess({ product: resp })),
            catchError(error =>
              of(getProductDetailsByIdFail({ error: error }))
            ));
      }
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductToCart),
      map(action => action.product),
      tap((product: Product) => {
        return this.toastr.success(`${product.name} was added to the card.`, 'Product added to the cart',
        {"positionClass": "toast-bottom-right"});
      })
    ),
    {dispatch: false}
  );

constructor(
  private actions$: Actions,
  private service: ProductsService,
  private toastr: ToastrService
) { }
}
