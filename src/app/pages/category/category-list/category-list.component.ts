import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadCategoriesRequest } from '../store/category.actions';
import * as categorySelectors from './../store/category.selectors';
import { State } from '../store/category.reducer';
import { Observable } from 'rxjs';
import { Category } from '../store/category.model';
import { RouteText } from 'src/app/app-properties';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Observable<Category[]> = this.store.select(categorySelectors.selectAllCategories);
  routeText = RouteText;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesRequest());
  }

}
