import { ClearObservable } from './../common/clear-observable';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent{

  @Input() product: Product;
  @Input() isInCart: boolean;

  @Output() productSelected = new EventEmitter<any>();

  select(): void {
    this.productSelected.emit(this.product);
  }

}
