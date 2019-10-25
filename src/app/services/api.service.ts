import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public root = "http://localhost:3000";
  constructor() { }
}
