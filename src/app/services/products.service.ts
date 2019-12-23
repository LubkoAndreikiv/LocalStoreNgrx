import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilterConfig, Product } from '../models/product';
import { map, filter, first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProduct(id: string): Observable<Product> {
    return this.http.get('http://localhost:3000/products')
    .pipe(
      map((products: Product[]) => products.find(p => p.id === id)));
  }

  search(pageNumber: number, itemsPerPage: number, filterConfig: FilterConfig): Observable<any> {
    return this.http.get('http://localhost:3000/products')
      .pipe(
        map((products: Product[]) => (filterConfig.search)
          ? products.filter(x => x.name.toLocaleLowerCase().includes(filterConfig.search.toLocaleLowerCase()))
          : products),
        map((products: Product[]) => (filterConfig.filter)
          ? products.filter(x => {
            return x.type.toLocaleLowerCase() === filterConfig.filter.toLocaleLowerCase();
          })
          : products),
        map((products: Product[]) => (filterConfig.priceRange)
          ? products.filter(x => {
            return (filterConfig.priceRange.oneFive && Number(x.price) >= 1 && Number(x.price) <= 5)
              || (filterConfig.priceRange.moreFive && Number(x.price) > 5)
              || (!filterConfig.priceRange.moreFive && !filterConfig.priceRange.oneFive);
          })
          : products
        ),
        map((products: Product[]) => {
          return { totalCount: products.length, products };
        }),
        map((response: any) => {
          response.products = response.products.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
          return response;
        })
      );
  }
}
