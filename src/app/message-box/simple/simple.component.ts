import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SimpleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
