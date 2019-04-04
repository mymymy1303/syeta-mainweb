import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    CategoryActionTypes,
    AddCategoryRequest, AddCategory,
    LoadCategoriesRequest, LoadCategories,
    UpdateCategoryWithImageRequest,
    UpdateCategory,
    UpdateCategoryWithoutImageRequest,
    FetchCategory
} from './category.actions';
import { CategoryRequestModel, Category, CategoryUpdateRequestModel } from './category.model';
import { map, exhaustMap, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { OpenAddedSuccessfullyDialog, OpenFailedDialog } from 'src/app/dialog/store/dialog.actions';
import { of } from 'rxjs';
import { DialogSampleText, RouteText } from 'src/app/app-properties';
import { FailedDialog, AddedSuccessfullyDialog } from 'src/app/dialog/store/dialog.model';
import { Action } from '@ngrx/store';

@Injectable()
export class CategoryEffects {
    @Effect()
    addOne$ = this.action$.pipe(
        ofType<AddCategoryRequest>(CategoryActionTypes.AddCategoryRequest),
        map(action => action.payload),
        exhaustMap((payload: CategoryRequestModel) => {
            return this.categoryService.addOne(payload).pipe(
                map((response: Category) => {
                    const dialog = {
                        navigateUrl: '/' + RouteText.listCategoryText,
                        title: response.title,
                        content: DialogSampleText.addCategorySuccessText,
                        imageUrl: response.imageUrl,
                        addNewUrl: '/' + RouteText.addCategoryText,
                        closeText: DialogSampleText.closeText,
                        continueText: DialogSampleText.continueText,
                        navigateText: DialogSampleText.viewListText,
                        heading: 'Thành công'
                    };
                    return {
                        category: response,
                        dialog
                    };
                }),
                mergeMap(
                    (data) => {
                        return of(
                            new AddCategory({ category: data.category }),
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
        ofType<LoadCategoriesRequest>(CategoryActionTypes.LoadCategoriesRequest),
        switchMap(() => {
            return this.categoryService.loadAll().pipe(
                map((response: Category[]) => {
                    return new LoadCategories({
                        categories: response
                    });
                }),
                catchError(error => {
                    console.log(error);
                    return null;
                })
            );
        })
    );

    @Effect()
    updateWithImage$ = this.action$.pipe(
        ofType<UpdateCategoryWithImageRequest>(CategoryActionTypes.UpdateCategoryWithImageRequest),
        map(action => action.payload),
        exhaustMap((payload: CategoryUpdateRequestModel) => {
            return this.categoryService.updateWithImage(payload).pipe(
                mergeMap(
                    (response: Category) => {
                        const successDialog: AddedSuccessfullyDialog = {
                            navigateUrl: '/' + RouteText.listCategoryText,
                            title: response.title,
                            content: DialogSampleText.updateCategorySuccessText,
                            imageUrl: response.imageUrl,
                            addNewUrl: '/' + RouteText.addCategoryText,
                            closeText: DialogSampleText.continueText,
                            continueText: DialogSampleText.updateSuccessThenNavigateToAddNewText,
                            navigateText: DialogSampleText.viewListText,
                            heading: 'Thành công'
                        };
                        const failedDialog: FailedDialog = {
                            message: `
                                <h2>Cập nhật loại sản phẩm thất bại</h2>
                                <p>Dữ liệu của bạn đã cũ, vui lòng đồng bộ dữ liệu mới nhất để tiếp tục.</p>
                            `,
                            closeText: DialogSampleText.closeText,
                            currentId: response.id,
                            fetchText: 'Đồng bộ dữ liệu mới nhất',
                            fetchAction: new FetchCategory(response.id)
                        };
                        return response.versionError ? of(new OpenFailedDialog(failedDialog) as Action) : of(
                            new UpdateCategory({
                                category: {
                                    id: response.id,
                                    changes: response
                                }
                            }),
                            new OpenAddedSuccessfullyDialog(successDialog)
                        );
                    }
                ),
                catchError(error => {
                    console.log('Error in updateWithImage');
                    return null;
                })
            );
        })
    );

    @Effect()
    updateWithoutImage$ = this.action$.pipe(
        ofType<UpdateCategoryWithoutImageRequest>(CategoryActionTypes.UpdateCategoryWithoutImageRequest),
        map(action => action.payload),
        exhaustMap((payload: CategoryUpdateRequestModel) => {
            return this.categoryService.updateWithoutImage(payload).pipe(
                mergeMap(
                    (response: Category) => {
                        const successDialog: AddedSuccessfullyDialog = {
                            navigateUrl: '/' + RouteText.listCategoryText,
                            title: response.title,
                            content: DialogSampleText.updateCategorySuccessText,
                            imageUrl: response.imageUrl,
                            addNewUrl: '/' + RouteText.addCategoryText,
                            closeText: DialogSampleText.continueText,
                            continueText: DialogSampleText.updateSuccessThenNavigateToAddNewText,
                            navigateText: DialogSampleText.viewListText,
                            heading: 'Thành công'
                        };
                        const failedDialog: FailedDialog = {
                            message: `
                                <h2>Cập nhật loại sản phẩm thất bại</h2>
                                <p>Dữ liệu của bạn đã cũ, vui lòng đồng bộ dữ liệu mới nhất để tiếp tục.</p>
                            `,
                            closeText: DialogSampleText.closeText,
                            currentId: response.id,
                            fetchText: 'Đồng bộ dữ liệu mới nhất',
                            fetchAction: new FetchCategory(response.id)
                        };
                        return response.versionError ?
                            of(new OpenFailedDialog(failedDialog) as Action)
                            : of(
                                new UpdateCategory({
                                    category: {
                                        id: response.id,
                                        changes: {
                                            title: response.title,
                                            subtitle: response.subtitle,
                                            lastModifiedUtc: response.lastModifiedUtc,
                                            version: response.version
                                        }
                                    }
                                }),
                                new OpenAddedSuccessfullyDialog(successDialog)
                            );
                    }
                ),
                catchError(error => {
                    console.log(error);
                    console.log('error in updateWithoutImage');
                    return null;
                })
            );
        })
    );

    @Effect()
    fetchCategory$ = this.action$.pipe(
        ofType<FetchCategory>(CategoryActionTypes.FetchCategory),
        map(action => action.payload),
        exhaustMap(payload => {
            return this.categoryService.getOne(payload).pipe(
                mergeMap(
                    (response: Category) => {
                        return of(
                            new UpdateCategory({
                                category: {
                                    id: response.id,
                                    changes: response
                                }
                            })
                        );
                    })
            );
        })
    );

    constructor(
        private action$: Actions,
        private categoryService: CategoryService
    ) { }
}
