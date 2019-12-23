import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import { first, map, mergeMap, skip, takeUntil } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/products.reducer';
import { getProductsInCart, getProductsState, getFilterValue, getFilterConfigValue } from "../store/products.selectors";
import {addProductToCart} from '../store/products.actions';
import { ClearObservable } from '../common/clear-observable';



export class ProductsContainerComponentOptions {
  productsPerPage: number;
  showPagesCount: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ClearObservable implements OnInit {
  private productsPerPage: number;
  showPagesCount: number;

  products: {info: Product, isInCart: boolean}[] = [];
  productsTotalCount = 0;
  currentPage = 1;

  constructor(private readonly productService: ProductsService,
              private readonly store: Store<ProductState>,
              options: ProductsContainerComponentOptions) {
                super();
                this.configurePagination(options);
  }

  private configurePagination(options: ProductsContainerComponentOptions) {
    this.productsPerPage = options.productsPerPage;
    this.showPagesCount = options.showPagesCount;
  }

  ngOnInit() {
   this.loadFilteredProducts();

   this.loadProductsInCart();
  }

  private loadFilteredProducts() {
    this.store.select(getFilterConfigValue)
      .pipe(mergeMap(filterConfig => forkJoin(this.productService.search(this.currentPage, this.productsPerPage, filterConfig), this.store.select(getProductsInCart).pipe(first()))), takeUntil(this.destroy$)).subscribe(([searchResponse, productsInCart]) => {
        this.productsTotalCount = searchResponse.totalCount;
        this.setProducts(searchResponse.products, productsInCart);
    });
  }

  private loadProductsInCart() {
    this.store.select(getProductsInCart).pipe(skip(1), takeUntil(this.destroy$))
      .subscribe((productsInCart: Product[]) => {
        this.setProducts(this.products.map(product => product.info), productsInCart);
      });
  }

  getTotalPageCount(): number {
    return Math.ceil(this.productsTotalCount / this.productsPerPage);
  }

  onPageClicked(page: number) {
    this.currentPage = page;

    this.store.select(getProductsState).pipe(first(),
      mergeMap(state =>
        this.productService.search(this.currentPage, this.productsPerPage, state.filterConfig).pipe(
          map(response => [response, state.productsInCart]))),
          takeUntil(this.destroy$)
    ).subscribe(([searchResponse, productsInCart]: [any, Product[]]) => {
      this.currentPage = 1;
      this.productsTotalCount = searchResponse.totalCount;
      this.setProducts(searchResponse.products, productsInCart);
    });
  }

  onProductSelected(product: Product) {
    this.store.dispatch(addProductToCart({product}));
  }

  private setProducts(products: Product[], productsInCart: Product[]): void {
    this.products = products.map(product => {
      return { info: product, isInCart : !!productsInCart.find(g => g.id === product.id)};
    });
  }
}
