import { Injectable } from '@angular/core';
import { CategoryRequestModel, CategoryUpdateRequestModel } from './store/category.model';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { EApisProperties } from 'src/app/app-properties';

@Injectable()
export class CategoryService {
    addOne(category: CategoryRequestModel) {
        const formData = new FormData();
        formData.append('title', category.title);
        formData.append('subtitle', category.subtitle);
        formData.append('image', category.image);
        formData.append('createdByAdminId', category.createdByAdminId);

        return this.httpClient.post(EApisProperties.baseUrl + EApisProperties.addCategoryPath, formData);
    }

    loadAll() {
        return this.httpClient.get('http://localhost:8080/apis/category');
    }

    updateWithoutImage(category: CategoryUpdateRequestModel) {
        const formData = new FormData();
        formData.append('idString', category.id);
        formData.append('title', category.title);
        formData.append('subtitle', category.subtitle);
        formData.append('image', category.image);
        formData.append('adminId', category.adminId);
        formData.append('isNewImage', 'false');
        formData.append('version', category.version);
        return this.httpClient.put(EApisProperties.baseUrl + EApisProperties.addCategoryPath, formData);
    }

    updateWithImage(category: CategoryUpdateRequestModel) {
        const formData = new FormData();
        formData.append('idString', category.id);
        formData.append('title', category.title);
        formData.append('subtitle', category.subtitle);
        formData.append('image', category.image);
        formData.append('adminId', category.adminId);
        formData.append('isNewImage', 'true');
        formData.append('version', category.version);
        return this.httpClient.put(EApisProperties.baseUrl + EApisProperties.addCategoryPath, formData);
    }

    getOne(id: string) {
        const url = EApisProperties.baseUrl + EApisProperties.getCategoryPath + '/' + id;
        return this.httpClient.get(url);
    }
    constructor(private httpClient: HttpClient) { }
}
