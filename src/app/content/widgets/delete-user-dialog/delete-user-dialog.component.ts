import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    /**
     * We can pass mat dialog data object to components created with MatDialog.
     */
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    /**
     * We can get a reference to this dialog and close it manually from here.
     */
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>
  ) { }

  ngOnInit() {
  }

  public delete() {
    // When closing dialog we can pass a value
    this.dialogRef.close(true);
  }

  public cancel() {
    this.dialogRef.close(false);
  }

}
