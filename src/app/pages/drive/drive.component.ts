import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DriveService } from '../../services/drive.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  constructor(public auth: AuthService, public afAuth: AngularFireAuth, public drive: DriveService) { }

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
}
