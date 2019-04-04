import { Action } from '@ngrx/store';

export interface AddedSuccessfullyDialog {
    navigateUrl: string;
    title: string;
    content: string;
    imageUrl: string;
    closeText: string;
    navigateText: string;
    heading: string;
    addNewUrl?: string;
    continueText?: string;
}

export interface FailedDialog {
    message: string;
    closeText: string;
    currentId: string;
    fetchText: string;
    fetchAction: Action;
}

export interface DeleteDialog {
    message: string;
    closeText: string;
    body: string;
    valueToMatch: string;
    id: string;
    deleteText: string;
    deleteAction: Action;
}
