import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { ProductModule } from './pages/product/product.module';
import { UrlBuilder } from './utils/url-builder.utils';
import { reducers, CustomSerializer } from './store/app.reducers';
import { AuthGuard } from './guards/auth.guard';
import { CategoryModule } from './pages/category/category.module';
import { DialogModule } from './dialog/dialog.module';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material';
import { HomeModule } from './pages/home/home.module';
import { CartModule } from './pages/cart/cart.module';
import { CheckoutModule } from './pages/checkout/checkout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    DialogModule,
    CategoryModule,
    ProductModule,
    MatIconModule,
    HomeModule,
    CartModule,
    CheckoutModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    UrlBuilder,
    AuthGuard,
    {provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
