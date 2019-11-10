import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private api: ApiService, private client: HttpClient) { }


  actions = [
    {
      title: "Downloading",
      progress: 50,
      showProgress: true,
      action: () => { },
      actionName: "Done",
      hasAction: true
    },
    {
      title: "Downloading",
      progress: 20,
      showProgress: true,
      action: () => { },
      actionName: "Done"
    }
  ];

  public async browse(uid, token, directory: string) {
    try {
      let result = await this.client.post(this.api.root + "/user/browse", {
        uid: uid,
        token: token,
        dir: directory
      }).toPromise();
      return { ...result };

    }
    catch (e) {
      return { status: "failed", message: e };
    }
  }

  public async createFolder(uid, token, location, folderName) {
    try {
      let result = await this.client.post(this.api.root + "/folder/create", {
        uid: uid,
        token: token,
        location: location,
        folderName: folderName
      }).toPromise();
      return { ...result };
    }
    catch (e) {
      return { status: "failed", message: e };
    }
  }

  public async deleteDir(uid, token, location, forFolder = false) {
    console.log(location);
    try {
      let body = {
        uid: uid,
        token: token,
        location: location
      };
      if (forFolder) {
        body["forFolder"] = true;
      }
      let result = await this.client.post(this.api.root + "/file/delete", body).toPromise();
      return { ...result };
    }
    catch (e) {
      return { status: "failed", message: e };
    }
  }

}
