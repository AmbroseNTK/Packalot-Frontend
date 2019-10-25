import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService, private afAuth: AngularFireAuth, private client: HttpClient) { }

  public idToken: string;
  public uid: string;

  public async loginWithEmail(email: string, password: string) {
    try {
      let credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.idToken = await credential.user.getIdToken();
      this.uid = this.afAuth.auth.currentUser.uid;
      return { uid: this.uid, idToken: this.idToken };
    }
    catch {
      return null;
    }
  }

  public async loginWithGoogle() {

  }

  public async signUp(registration: UserRegistration) {
    return {
      ... (await this.client.post(this.api.root + "/user/create", {
        payload: {
          ...registration
        }
      }).toPromise())
    };
  }

  public async getUserInfoAsync() {
    let usr = await this.afAuth.user.toPromise();
    return { uid: usr.uid, displayName: usr.displayName, photoUrl: usr.photoURL };

  }

  public getUserInfo() {
    return this.afAuth.user;
  }

  public getUserRecord(token, uid) {
    return this.client.post(this.api.root + "/user/get", {
      token: token,
      uid: uid
    });
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
  }

}
