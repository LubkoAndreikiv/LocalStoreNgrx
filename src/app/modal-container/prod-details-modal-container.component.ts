import { Location } from '@angular/common';
import { ProductDetailsModalComponent } from './../product-details-modal/product-details-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProductState } from '../store/products.reducer';
import { Store } from '@ngrx/store';
import { getProductDetailsById } from '../store/products.actions';

@Component({
  selector: 'app-modal-container-component',
  template: ''
})
export class ProductDetailsModalContainerComponent implements OnDestroy {
  destroy$ = new Subject<any>();
  currentDialog: NgbModalRef = null;

  constructor(
    private modalService: NgbModal,
    route: ActivatedRoute,
    private location: Location,
    private store: Store<ProductState>
  ) {
    route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
        this.store.dispatch(getProductDetailsById({id: params.id}));

        this.currentDialog = this.modalService.open(ProductDetailsModalComponent, {centered: true});

        this.currentDialog.result.then(result => {
            this.location.back();
        }, reason => {
          this.location.back();
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
