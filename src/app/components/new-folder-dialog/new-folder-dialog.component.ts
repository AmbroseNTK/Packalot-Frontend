import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.scss']
})
export class NewFolderDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewFolderDialogComponent>) { }

  folderName = "";

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
