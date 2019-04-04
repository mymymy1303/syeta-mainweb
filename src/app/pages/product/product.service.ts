import { Injectable } from '@angular/core';
// import { IGetProductListRequest } from './store/product.models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EApisProperties } from 'src/app/app-properties';
import { UrlBuilder } from 'src/app/utils/url-builder.utils';
import { AddProductRequestModel, ProductUpdateModel, ProductDeleteModel } from './store/product.model';

@Injectable()
export class ProductService {

    searchByKeyword(keyword: string, sortBy = 1, page = 1, size = 5) {
        const body = new HttpParams()
            .set('page', '' + page)
            .set('sortBy', '' + sortBy)
            .set('keyword', '' + keyword)
            .set('size', '' + size);

        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.searchProductByKeywordPath,
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

    addOne(data: AddProductRequestModel) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('briefContent', data.briefContent);
        formData.append('fullContent', data.fullContent);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('createdByAdminId', data.createdByAdminId);
        formData.append('pageId', data.pageId);
        formData.append('image', data.image);
        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.addProductPath,
            formData
        );
    }

    loadAll(data: { sortBy?: string, page?: string, size?: string }) {
        const body = new HttpParams()
            .set('sortBy', '' + data.sortBy)
            .set('page', '' + data.page)
            .set('size', '' + data.size);

        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.getProductPath,
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

    loadByCategory(data: { sortBy?: string, page?: string, size?: string, categoryId: string }) {
        const body = new HttpParams()
            .set('sortBy', '' + data.sortBy)
            .set('page', '' + data.page)
            .set('size', '' + data.size)
            .set('categoryId', '' + data.categoryId);

        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.getProductPath,
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

    loadOneById(id: string) {
        return this.httpClient.get(
            EApisProperties.baseUrl + EApisProperties.getOneByIdPath + id
        );
    }

    updateWithoutImage(data: ProductUpdateModel) {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('briefContent', data.briefContent);
        formData.append('fullContent', data.fullContent);
        formData.append('price', '' + data.price);
        formData.append('quantity', '' + data.quantity);
        formData.append('pageId', data.pageId);
        formData.append('version', '' + data.version);
        formData.append('adminId', data.adminId);
        formData.append('isNewImage', '' + data.isNewImage);

        return this.httpClient.put(
            EApisProperties.baseUrl + EApisProperties.updateProductPath,
            formData
        );
    }

    updateWithImage(data: ProductUpdateModel) {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('briefContent', data.briefContent);
        formData.append('fullContent', data.fullContent);
        formData.append('price', '' + data.price);
        formData.append('quantity', '' + data.quantity);
        formData.append('pageId', data.pageId);
        formData.append('image', data.image);
        formData.append('version', '' + data.version);
        formData.append('adminId', data.adminId);
        formData.append('isNewImage', '' + data.isNewImage);
        return this.httpClient.put(
            EApisProperties.baseUrl + EApisProperties.updateProductPath,
            formData
        );
    }

    deleteOne(data: ProductDeleteModel) {
        const body = new HttpParams()
            .set('id', '' + data.id)
            .set('adminId', '' + data.adminId);

        return this.httpClient.post(
            EApisProperties.baseUrl + EApisProperties.deleteProductPath,
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

    constructor(private httpClient: HttpClient) { }
}
