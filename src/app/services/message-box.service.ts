import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleComponent } from '../message-box/simple/simple.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  public message = "";
  constructor(private snackbar: MatSnackBar) { }

  public showSimpleMessage(message) {
    this.message;
    //this.snackbar.openFromComponent(SimpleComponent, { duration: 5000 });
    this.snackbar.open(message, null, { duration: 5000 });
  }
}
