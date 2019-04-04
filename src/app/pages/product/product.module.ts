import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/product.reducer';

import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { LayoutComponent } from './layout.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material';
import { CategoryModule } from '../category/category.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [ProductListComponent, LayoutComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    CategoryModule,
    StoreModule.forFeature('productFeature', fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService]
})
export class ProductModule { }
