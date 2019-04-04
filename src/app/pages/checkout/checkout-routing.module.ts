import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CheckoutStepOneComponent } from './checkout-step-one/checkout-step-one.component';
import { CheckoutStepTwoComponent } from './checkout-step-two/checkout-step-two.component';
import { CheckoutStepThreeComponent } from './checkout-step-three/checkout-step-three.component';

const routes: Routes = [
    {
        path: 'checkout', component: LayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'buoc-1' },
            { path: 'buoc-1', component: CheckoutStepOneComponent },
            { path: 'buoc-2', component: CheckoutStepTwoComponent },
            { path: 'buoc-3', component: CheckoutStepThreeComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class CheckoutRoutingModule { }
