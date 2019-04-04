import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OrderRequest, SimpleCartItem } from './store/cart.model';
import { EApisProperties } from 'src/app/app-properties';

@Injectable()
export class CartService {
    makeOrder(data: OrderRequest) {
        const body = new HttpParams()
            .set('fullName', data.fullName)
            .set('phoneNumber', data.phoneNumber)
            .set('email', data.email)
            .set('address', data.address)
            .set('note', data.note)
            .set('productId', data.productId)
            .set('totalPrice', data.totalPrice);

        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.makeOrderPath,
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

    fetchFromCart(data: SimpleCartItem) {
        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.fetchFromCartPath,
            data,
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
            }
        );
    }

    constructor(private httpClient: HttpClient) { }
}
