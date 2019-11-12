import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.scss']
})
export class BreadcrumsComponent implements OnInit {

  @Input()
  directory = [];

  @Output()
  onNavigate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  goTo(dirName, index) {

    while (this.directory.length != 0 && index != this.directory.length - 1) {
      this.directory.pop();
    }
    let dir = "";
    for (let i = 0; i < this.directory.length; i++) {
      dir += "/" + this.directory[i];
    }
    if (dirName == "") {
      dir = "/";
    }
    this.onNavigate.emit({ directory: this.directory, dir: dir });
  }

}
