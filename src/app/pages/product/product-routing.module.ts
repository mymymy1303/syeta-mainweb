import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LayoutComponent } from './layout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
    {
        path: 'product', component: LayoutComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'list' },
            { path: 'list', component: ProductListComponent },
            { path: ':id', component: ProductDetailComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ProductRoutingModule { }
