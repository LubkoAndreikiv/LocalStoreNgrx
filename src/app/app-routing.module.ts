import { ProductDetailsModalComponent } from './product-details-modal/product-details-modal.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsModalContainerComponent } from './modal-container/prod-details-modal-container.component';


const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    children: [ {
      path: ':id',
      component: ProductDetailsModalContainerComponent
    }]
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
