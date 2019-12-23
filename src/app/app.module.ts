import { ProductsService } from './services/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './product-item/product-item.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { productReducer } from './store/products.reducer';
import { ProductsContainerComponentOptions } from './product-list/product-list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductDetailsModalComponent } from './product-details-modal/product-details-modal.component';
import { ProductDetailsModalContainerComponent } from './modal-container/prod-details-modal-container.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const productsContainerComponentOptions =
  {productsPerPage: environment.productsPerPage, showPagesCount: environment.showPagesCount} as ProductsContainerComponentOptions;

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    PaginatorComponent,
    HeaderComponent,
    CartComponent,
    FilterComponent,
    ProductDetailsModalComponent,
    ProductDetailsModalContainerComponent,
  ],
  entryComponents: [
    CartComponent,
    ProductDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({state: productReducer}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ProductsEffects]),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: ProductsContainerComponentOptions, useValue: productsContainerComponentOptions},
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
