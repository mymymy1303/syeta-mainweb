import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCategory from './store/category.reducer';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './store/category.effects';
import { CategoryService } from './category.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    StoreModule.forFeature('categoryFeature', fromCategory.reducer),
    EffectsModule.forFeature([CategoryEffects])
  ],
  exports: [CategoryListComponent],
  providers: [CategoryService]
})
export class CategoryModule { }
