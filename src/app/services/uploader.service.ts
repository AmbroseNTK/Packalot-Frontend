import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { ApiService } from './api.service';
import { map, tap, last, catchError } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {


  constructor(private api: ApiService, private http: HttpClient) { }

  onProgress: (progress) => void;
  errorHandler: () => void;

  upload(uid, token, location, file) {
    let form = new FormData();
    form.append("uid", uid);
    form.append("token", token);
    form.append("location", location);
    form.append("file", file, file.name);

    const req = new HttpRequest('POST', this.api.root + '/upload', form, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.onProgress(message)),
      last(), // return last (completed) message to caller
      catchError(() => { this.errorHandler(); return null; }));
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return percentDone;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

}
