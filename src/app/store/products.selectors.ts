import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';

export const getProductsState = createFeatureSelector<ProductState>('state');

export const getFilterConfigValue = createSelector(getProductsState, state => state.filterConfig);
export const getProductDetailsById = createSelector(getProductsState, state => state.filterConfig);
export const getFilterValue = createSelector(getProductsState, state => state.filterValue);
export const getProductsInCart = createSelector(getProductsState, state => state.productsInCart);
export const getCurrentProduct = createSelector(getProductsState, state => state.currentProduct);
