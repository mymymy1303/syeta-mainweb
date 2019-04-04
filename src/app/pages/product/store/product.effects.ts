import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import {
    AddProductRequest,
    ProductActionTypes,
    AddProduct,
    LoadAllProductsRequest,
    UpsertProducts,
    UpdatePaginationInfo,
    LoadProductsByCategoryRequest,
    FetchProduct,
    FetchProductSuccessful,
    FetchProductFailed,
    UpsertProduct,
    UpdateProductWithoutImageRequest,
    UpdateProductWithImageRequest,
    DeleteProductRequest,
    DeleteProduct
} from './product.actions';
import { map, exhaustMap, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AddProductRequestModel, Product, LoadProductResponse, ProductUpdateModel } from './product.model';
import { DialogSampleText } from 'src/app/app-properties';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OpenAddedSuccessfullyDialog, OpenFailedDialog } from 'src/app/dialog/store/dialog.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { FailedDialog, AddedSuccessfullyDialog } from 'src/app/dialog/store/dialog.model';

@Injectable()
export class ProductEffects {

    @Effect()
    addOne$ = this.action$.pipe(
        ofType<AddProductRequest>(ProductActionTypes.AddProductRequest),
        map(action => action.payload),
        exhaustMap((payload: AddProductRequestModel) => {
            return this.productService.addOne(payload).pipe(
                map((response: Product) => {
                    const dialog = {
                        navigateUrl: '/product/list',
                        title: response.title,
                        content: DialogSampleText.addCategorySuccessText,
                        imageUrl: response.imageUrl,
                        addNewUrl: '/product/add',
                        closeText: DialogSampleText.closeText,
                        continueText: DialogSampleText.continueText,
                        navigateText: DialogSampleText.viewListText,
                        heading: 'Thành công'
                    };
                    return {
                        product: response,
                        dialog
                    };
                }),
                mergeMap(
                    (data) => {
                        return of(
                            new AddProduct({ product: data.product }),
                            new OpenAddedSuccessfullyDialog(data.dialog)
                        );
                    }
                ),
                catchError(error => {
                    console.log(error);
                    return null;
                })
            );
        })
    );

    @Effect()
    loadAll$ = this.action$.pipe(
        ofType<LoadAllProductsRequest>(ProductActionTypes.LoadAllProductsRequest),
        map(action => action.payload),
        switchMap((payload) => {
            return this.productService.loadAll(payload).pipe(
                mergeMap((response: LoadProductResponse) => {
                    return of(
                        new UpsertProducts({
                            products: response.productList
                        }),
                        new UpdatePaginationInfo(response.paginationInfo)
                    );
                }),
                catchError(error => null)
            );
        })
    );

    @Effect()
    loadByCategory$ = this.action$.pipe(
        ofType<LoadProductsByCategoryRequest>(ProductActionTypes.LoadProductsByCategoryRequest),
        map(action => action.payload),
        switchMap((payload) => {
            return this.productService.loadByCategory({
                sortBy: payload.sortBy,
                size: payload.size,
                page: payload.page,
                categoryId: payload.categoryId
            }).pipe(
                mergeMap((response: LoadProductResponse) => {
                    return of(
                        new UpsertProducts({
                            products: response.productList
                        }),
                        new UpdatePaginationInfo(response.paginationInfo)
                    );
                }),
                catchError(error => null)
            );
        })
    );

    @Effect()
    fetchProduct$ = this.action$.pipe(
        ofType<FetchProduct>(ProductActionTypes.FetchProduct),
        map(action => action.payload),
        exhaustMap(
            (payload) => {
                return this.productService.loadOneById(payload).pipe(
                    mergeMap(
                        (response: Product) => {
                            if (response.id === null) {
                                return of(new FetchProductFailed() as Action);
                            } else {
                                return of(new FetchProductSuccessful(response));
                            }
                        }
                    )
                );
            }
        )
    );

    @Effect()
    updateProductWithoutImage$ = this.action$.pipe(
        ofType<UpdateProductWithoutImageRequest>(ProductActionTypes.UpdateProductWithoutImageRequest),
        map(action => action.payload),
        exhaustMap(
            (toUpdateProduct: ProductUpdateModel) => {
                return this.productService.updateWithoutImage(toUpdateProduct).pipe(
                    mergeMap((response: Product) => {
                        const successDialog: AddedSuccessfullyDialog = {
                            navigateUrl: '/product/list',
                            title: response.title,
                            content: DialogSampleText.updateProductSuccesstext,
                            imageUrl: response.imageUrl,
                            addNewUrl: '/product/add',
                            closeText: DialogSampleText.continueText,
                            continueText: DialogSampleText.updateProductSuccessThenNavigateToAddNewText,
                            navigateText: DialogSampleText.viewListText,
                            heading: 'Thành công'
                        };
                        const failedDialog: FailedDialog = {
                            message: `
                                <h2>Cập nhật sản phẩm thất bại</h2>
                                <p>Dữ liệu của bạn đã cũ, vui lòng đồng bộ dữ liệu mới nhất để tiếp tục.</p>
                            `,
                            closeText: DialogSampleText.closeText,
                            currentId: response.id,
                            fetchText: 'Đồng bộ dữ liệu mới nhất',
                            fetchAction: new FetchProduct(response.id)
                        };
                        return response.versionError
                            ? of(new OpenFailedDialog(failedDialog) as Action)
                            : of(
                                new UpsertProduct({
                                    product: response
                                }),
                                new OpenAddedSuccessfullyDialog(successDialog)
                            );
                    })
                );
            }
        )
    );

    @Effect()
    updateProductWithImageRequest$ = this.action$.pipe(
        ofType<UpdateProductWithImageRequest>(ProductActionTypes.UpdateProductWithImageRequest),
        map(action => action.payload),
        exhaustMap(
            (toUpdateProduct: ProductUpdateModel) => {
                return this.productService.updateWithImage(toUpdateProduct).pipe(
                    mergeMap((response: Product) => {
                        const successDialog: AddedSuccessfullyDialog = {
                            navigateUrl: '/product/list',
                            title: response.title,
                            content: DialogSampleText.updateProductSuccesstext,
                            imageUrl: response.imageUrl,
                            addNewUrl: '/product/add',
                            closeText: DialogSampleText.continueText,
                            continueText: DialogSampleText.updateProductSuccessThenNavigateToAddNewText,
                            navigateText: DialogSampleText.viewListText,
                            heading: 'Thành công'
                        };
                        const failedDialog: FailedDialog = {
                            message: `
                                <h2>Cập nhật sản phẩm thất bại</h2>
                                <p>Dữ liệu của bạn đã cũ, vui lòng đồng bộ dữ liệu mới nhất để tiếp tục.</p>
                            `,
                            closeText: DialogSampleText.closeText,
                            currentId: response.id,
                            fetchText: 'Đồng bộ dữ liệu mới nhất',
                            fetchAction: new FetchProduct(response.id)
                        };
                        return response.versionError
                            ? of(new OpenFailedDialog(failedDialog) as Action)
                            : of(
                                new UpsertProduct({
                                    product: response
                                }),
                                new OpenAddedSuccessfullyDialog(successDialog)
                            );
                    })
                );
            }
        )
    );


    @Effect()
    deleteProduct$ = this.action$.pipe(
        ofType<DeleteProductRequest>(ProductActionTypes.DeleteProductRequest),
        map(action => action.payload),
        exhaustMap(
            (data) => {
                return this.productService.deleteOne(data).pipe(
                    mergeMap(
                        (response: Product) => {
                            const successDialog: AddedSuccessfullyDialog = {
                                navigateUrl: '/product/list',
                                title: response.title,
                                content: DialogSampleText.deleteProductSuccessText,
                                imageUrl: response.imageUrl,
                                addNewUrl: '/product/add',
                                closeText: DialogSampleText.closeText,
                                continueText: DialogSampleText.updateProductSuccessThenNavigateToAddNewText,
                                navigateText: DialogSampleText.viewListText,
                                heading: 'Thành công'
                            };
                            return of(
                                new OpenAddedSuccessfullyDialog(successDialog),
                                new DeleteProduct({
                                    id: data.id
                                })
                            );
                        }
                    )
                );
            }
        )
    );

    constructor(
        private action$: Actions,
        private productService: ProductService
    ) { }
}
