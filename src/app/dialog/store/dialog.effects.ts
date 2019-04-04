import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { OpenAddedSuccessfullyDialog, DialogActionTypes, OpenFailedDialog, OpenDeleteConfirmDialog } from './dialog.actions';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { empty } from 'rxjs';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailedDialogComponent } from '../failed-dialog/failed-dialog.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';


@Injectable()
export class DialogEffects {
    @Effect()
    addedSuccessfulDialog$ = this.action$.pipe(
        ofType<OpenAddedSuccessfullyDialog>(DialogActionTypes.OpenAddedSuccessfullyDialog),
        map(action => action.payload),
        switchMap(
            (payload) => {
                this.matDialog.open(SuccessDialogComponent, {
                    data: payload
                });
                return empty();
            }
        )
    );

    @Effect()
    failedDialog$ = this.action$.pipe(
        ofType<OpenFailedDialog>(DialogActionTypes.OpenFailedDialog),
        map(action => action.payload),
        switchMap(
            (payload) => {
                this.matDialog.open(FailedDialogComponent, {
                    data: payload
                });
                return empty();
            }
        )
    );

    @Effect()
    deleteConfirmDialog$ = this.action$.pipe(
        ofType<OpenDeleteConfirmDialog>(DialogActionTypes.OpenDeleteConfirmDialog),
        map(action => action.payload),
        switchMap(
            (payload) => {
                this.matDialog.open(DeleteConfirmDialogComponent, {
                    data: payload
                });
                return empty();
            }
        )
    );

    constructor(
        private action$: Actions,
        private matDialog: MatDialog
    ) {}
}
