import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/products.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { setFilterConfigValue } from '../store/products.actions';
import { debounceTime, distinctUntilChanged, map, tap, filter, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { FilterConfig } from '../models/product';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClearObservable } from '../common/clear-observable';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends ClearObservable implements OnInit {

  private searchValue: string;
  private filterValue: string;
  private filterConfig: FilterConfig = {
    search: '',
    filter: '',
    priceRange: { oneFive: false, moreFive: false }
  };

  public formGroup: FormGroup = this.formBuilder.group({
    filter: new FormControl(this.filterConfig.filter),
    priceRange: this.formBuilder.group({
      oneFive: new FormControl(this.filterConfig.priceRange.oneFive),
      moreFive: new FormControl(this.filterConfig.priceRange.moreFive)
    }),
    search: new FormControl(this.filterConfig.search)
  });

  constructor(private store: Store<ProductState>, private route: ActivatedRoute, private router: Router,
              private readonly formBuilder: FormBuilder) {
                super();
                this.retrieveSearchTerm();
  }

  private retrieveSearchTerm() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.formGroup.get('search').setValue(params['search'] || ''));
  }

  ngOnInit() {
    this.setFilterConfigValue();
    this.search();
  }

  search(): void {
    const homePagePath = '/products';
    this.formGroup.get('search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(search => {
        this.filterConfig.search = search;
        this.router.navigate([homePagePath], { queryParams: { search: this.filterConfig.search } })
        this.setFilterConfigValue();
      })
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe();

    this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(filters => this.setFilterValue(filters));
  }

  private setFilterConfigValue(): void {
    this.store.dispatch(setFilterConfigValue({ filterConfig: { ...this.filterConfig } }));
  }

  private setFilterValue(filter: FilterConfig): void {
    this.filterConfig = filter;
    this.setFilterConfigValue();
  }
}
