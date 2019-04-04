import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddedSuccessfullyDialog } from '../store/dialog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddedSuccessfullyDialog,
    private matDialogRef: MatDialogRef<SuccessDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public close() {
    return this.matDialogRef.close();
  }

  public navigate() {
    this.close();
    return this.router.navigate([this.data.navigateUrl]);
  }

  public addNew() {
    this.close();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.data.addNewUrl]);
    });
  }

  public continue() {

  }

}
