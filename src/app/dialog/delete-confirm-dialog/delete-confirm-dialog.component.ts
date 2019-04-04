import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeleteDialog } from '../store/dialog.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {
  deleteConfirmForm = this.fb.group({
    title: new FormControl('', [Validators.required])
  });

  isMatchedTitle = true;

  get title() {
    return this.deleteConfirmForm.get('title');
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialog,
    private matDialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  public close() {
    return this.matDialogRef.close();
  }

  onSubmit() {
    const title = this.deleteConfirmForm.value.title;
    if (title === this.data.valueToMatch) {
      this.close();
      this.isMatchedTitle = true;
      this.store.dispatch(this.data.deleteAction);
    } else {
      this.isMatchedTitle = false;
    }
  }
}
