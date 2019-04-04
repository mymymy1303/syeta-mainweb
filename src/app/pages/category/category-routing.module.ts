import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RouteText } from 'src/app/app-properties';

const routes: Routes = [
    { path: RouteText.listCategoryText, component: CategoryListComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class CategoryRoutingModule { }
