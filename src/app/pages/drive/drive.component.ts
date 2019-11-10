import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DriveService } from '../../services/drive.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploaderService } from 'src/app/services/uploader.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from 'src/app/components/new-folder-dialog/new-folder-dialog.component';
import { UploadDialogComponent } from 'src/app/components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  constructor(public auth: AuthService, public afAuth: AngularFireAuth, public drive: DriveService, public uploader: UploaderService, public dialog: MatDialog) { }

  files = { files: [], folders: [] };
  currentDir = [];

  userInfo = {
    displayName: "",
    photoUrl: "",
    email: "",
    uid: "",
    used: 0,
    packSize: 0
  }

  public getSize(size) {
    return Math.round(size / 1024 / 1024 / 1024 * 100) / 100;
  }

  public getPercentage() {
    if (this.userInfo.used < this.userInfo.packSize) {
      return Math.round(this.userInfo.used / this.userInfo.packSize * 10000) / 100;
    }
    return 100;
  }

  ngOnInit() {
    this.auth.getUserInfo().subscribe(async (usr) => {
      this.userInfo.displayName = usr.displayName;
      this.userInfo.email = usr.email;
      this.userInfo.photoUrl = usr.photoURL;
      this.userInfo.uid = usr.uid;

      let idToken = await usr.getIdToken();

      this.auth.getUserRecord(idToken, usr.uid).subscribe((record) => {
        this.userInfo = {
          ...this.userInfo,
          ...record["payload"]
        };
        console.log(this.userInfo);
      })

      let result = await this.drive.browse(usr.uid, idToken, "/");
      this.files = { files: result['files'], folders: result['folders'] };
    });
  }

  async onBreadcrumsNavigate(event) {
    let token = await this.afAuth.auth.currentUser.getIdToken();
    this.currentDir = event.directory;
    let result = await this.drive.browse(this.userInfo.uid, token, event.dir + "/");
    console.log(result);
    this.files = { files: result['files'], folders: result['folders'] };
  }

  getDir(dirArray) {
    let dir = "";
    for (let i = 0; i < dirArray.length; i++) {
      dir += "/" + dirArray[i];
    }
    if (dirArray.length == 0) {
      dir = "/";
    }
    return dir;
  }

  async onOpenFolder(folder) {
    this.currentDir.push(folder);
    let dir = "";
    for (let i = 0; i < this.currentDir.length; i++) {
      dir += "/" + this.currentDir[i];
    }
    if (this.currentDir.length == 0) {
      dir = "/";
    }
    await this.onBreadcrumsNavigate({ directory: this.currentDir, dir: dir });
  }

  async onOpenFile(files) {
    let dialogData = {
      progress: 0,
      fileName: files[0].name,
      status: {
        isError: false,
        message: ""
      }
    };

    this.uploader.errorHandler = (err) => {
      dialogData.status["isCompleted"] = true;
      dialogData.status["message"] = "No more space";
    };
    this.uploader.onProgress = (progress) => { dialogData.status = progress };

    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '300px',
      data: dialogData
    });

    let token = await this.afAuth.auth.currentUser.getIdToken();
    let result = this.uploader.upload(this.userInfo.uid, token, this.getDir(this.currentDir) + "/", files[0]).subscribe(async (status) => {
      let fileResult = await this.drive.browse(this.userInfo.uid, token, this.getDir(this.currentDir) + "/");
      this.files = { files: fileResult['files'], folders: fileResult['folders'] };
      this.reloadUsedSpace();
    });

  }

  createFolder() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data != undefined) {
        let token = await this.afAuth.auth.currentUser.getIdToken();
        let result = await this.drive.createFolder(this.userInfo.uid, token, this.getDir(this.currentDir) + "/", data);
        let fileResult = await this.drive.browse(this.userInfo.uid, token, this.getDir(this.currentDir) + "/");
        this.files = { files: fileResult['files'], folders: fileResult['folders'] };
      }
    })
  }

  async reloadUsedSpace() {
    this.auth.getUserRecord(await this.afAuth.auth.currentUser.getIdToken(), this.userInfo.uid).subscribe((record) => {
      this.userInfo = {
        ...this.userInfo,
        ...record["payload"]
      };

    });
  }

  onFileActionClose() {
    this.onBreadcrumsNavigate({ directory: this.currentDir, dir: this.getDir(this.currentDir) });
    this.reloadUsedSpace();
  }

}
