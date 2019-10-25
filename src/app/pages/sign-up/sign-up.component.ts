import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DriveService } from '../../services/drive.service';
import { MessageBoxService } from '../../services/message-box.service';
import { UserRegistration } from '../../models/user-registration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public auth: AuthService, public drive: DriveService, public message: MessageBoxService, public router: Router) { }

  userRegistration: UserRegistration = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
    phoneNumber: ""
  };

  ngOnInit() {
  }

  public async onClickLoginWithEmail(email, password) {
    console.log(email);
    try {
      let result = await this.auth.loginWithEmail(email, password);
      if (result != null) {
        this.router.navigate(["drive"]);
      }
    }
    catch (e) {
      this.message.showSimpleMessage(e);
    }
  }

  public async onClickSignUp() {
    console.log(this.userRegistration);
    let result = await this.auth.signUp(this.userRegistration);
    console.log(result);
    if (result["status"] == "failed") {
      this.message.showSimpleMessage(result["message"]);
    }
    else {

    }
  }


}
