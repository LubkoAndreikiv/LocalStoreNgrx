import {createAction, props} from '@ngrx/store';
import { FilterConfig, Product } from '../models/product';


export const setFilterConfigValue = createAction(
  '[App] Set filter config type value',
  props<{filterConfig: FilterConfig}>()
);

export const addProductToCart = createAction(
  '[App] Add info to cart',
  props<{product: Product}>()
);

export const removeProductFromCart = createAction(
  '[App] Remove products from cart',
  props<{productId: string}>()
);

export const clearProductsInCart = createAction(
  '[App] Clear products in cart'
);

export const getProductDetailsById = createAction(
  '[App] Get Product Details By Id',
  props<{id: string}>()
);

export const getProductDetailsByIdSuccess = createAction(
  '[App] Get Product Details By Id Success',
  props<{product: Product}>()
);

export const getProductDetailsByIdFail = createAction(
  '[App] Get Product Details By Id Fail',
  props<{error: string}>()
);
