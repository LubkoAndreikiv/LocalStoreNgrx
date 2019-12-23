import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './products.actions';
import { Product, FilterConfig } from '../models/product';

export interface ProductState {
  searchValue: string;
  filterValue: string;
  productsInCart: Product[];
  filterConfig: FilterConfig;
  currentProduct: Product;
  errors: string[];
}

const initialState: ProductState = {
  searchValue: '',
  filterValue: '',
  productsInCart: [],
  filterConfig: {
    search: '',
    filter: '',
    priceRange: { oneFive: false, moreFive: false }
  },
  currentProduct: null,
  errors: []
};

const reducer = createReducer(
  initialState,
  on(Actions.setFilterConfigValue, (state, { filterConfig }) => ({ ...state, filterConfig })),
  on(Actions.addProductToCart, (state, { product }) => ({ ...state, productsInCart: [...state.productsInCart, product] })),
  on(Actions.removeProductFromCart, (state, { productId }) => ({ ...state, productsInCart: state.productsInCart.filter(x => x.id !== productId) })),
  on(Actions.clearProductsInCart, (state) => ({ ...state, productsInCart: [] })),
  on(Actions.getProductDetailsByIdSuccess, (state, { product }) => ({ ...state, currentProduct: product })),
  on(Actions.getProductDetailsByIdFail, (state, { error }) => ({ ...state, errors: [...state.errors, error] }))
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return reducer(state, action);
}
