import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/products.reducer';
import { getFilterConfigValue, getProductsInCart, getCurrentProduct } from '../store/products.selectors';
import { mergeMap, first, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent extends ProductItemComponent implements OnInit, OnDestroy {
  public destroy$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private store: Store<ProductState>, private bsModalRef: NgbActiveModal) {
    super();
  }

  ngOnInit(): void {
    this.store.select(getCurrentProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentProduct => {
        this.product = currentProduct;
      }
      );
  }
}
