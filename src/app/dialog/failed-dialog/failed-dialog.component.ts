import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FailedDialog } from '../store/dialog.model';
import { Router } from '@angular/router';
import { RouteText } from 'src/app/app-properties';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-failed-dialog',
  templateUrl: './failed-dialog.component.html',
  styleUrls: ['./failed-dialog.component.css']
})
export class FailedDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FailedDialog,
    private matDialogRef: MatDialogRef<FailedDialogComponent>,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  public close() {
    return this.matDialogRef.close();
  }

  public fetch() {
    this.close();
    this.store.dispatch(this.data.fetchAction);
  }

}
