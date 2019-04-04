import { Action } from '@ngrx/store';
import { AddedSuccessfullyDialog, FailedDialog, DeleteDialog } from './dialog.model';

export enum DialogActionTypes {
    OpenAddedSuccessfullyDialog = '[Dialog] Open added successfully dialog',
    OpenFailedDialog = '[Dialog] Open failed dialog',
    OpenDeleteConfirmDialog = '[Dialog] Open delete confirm dialog'
}

export class OpenAddedSuccessfullyDialog implements Action {
    readonly type = DialogActionTypes.OpenAddedSuccessfullyDialog;
    constructor(public payload: AddedSuccessfullyDialog) { }
}

export class OpenFailedDialog implements Action {
    readonly type = DialogActionTypes.OpenFailedDialog;
    constructor(public payload: FailedDialog) { }
}

export class OpenDeleteConfirmDialog implements Action {
    readonly type = DialogActionTypes.OpenDeleteConfirmDialog;
    constructor(public payload: DeleteDialog) { }
}

export type DialogActions = OpenAddedSuccessfullyDialog | OpenFailedDialog | OpenDeleteConfirmDialog;
