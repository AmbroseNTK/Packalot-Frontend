import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DriveService } from 'src/app/services/drive.service';

@Component({
  templateUrl: './file-action-dialog.component.html',
  styleUrls: ['./file-action-dialog.component.scss']
})
export class FileActionDialogComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<FileActionDialogComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public drive: DriveService) {
    if (data.forFolder) {
      this.buildMenuForFolder();
    }
  }

  menu = [
    {
      icon: "https://image.flaticon.com/icons/svg/189/189665.svg", text: "Info", handler: () => {
        this._bottomSheetRef.dismiss();
      }
    }, {
      icon: "https://image.flaticon.com/icons/svg/124/124818.svg", text: "Move", handler: () => {

      }
    }, {
      icon: "https://image.flaticon.com/icons/svg/2270/2270591.svg", text: "Copy", handler: () => {

      }
    },
    {
      icon: "https://image.flaticon.com/icons/svg/1632/1632602.svg", text: "Delete", handler: async () => {
        let result = await this.drive.deleteDir(this.data.uid, this.data.token, this.data.location);
        this._bottomSheetRef.dismiss();
      }
    }
  ]

  ngOnInit() {
  }

  buildMenuForFolder() {
    this.menu = [
      {
        icon: "https://image.flaticon.com/icons/svg/189/189665.svg", text: "Info", handler: () => {

        }
      },
      {
        icon: "https://image.flaticon.com/icons/svg/1420/1420322.svg", text: "Move", handler: () => {

        }
      }, {
        icon: "https://image.flaticon.com/icons/svg/1087/1087547.svg", text: "Clone", handler: () => {

        }
      }, {
        icon: "https://image.flaticon.com/icons/svg/1632/1632602.svg", text: "Delete", handler: () => {

        }
      },
    ]
  }

}
