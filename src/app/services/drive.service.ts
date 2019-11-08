import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private api: ApiService, private client: HttpClient) { }

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

}
