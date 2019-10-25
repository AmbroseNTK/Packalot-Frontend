import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {


  @Input()
  files = { files: [], folders: [] };

  @Output()
  onOpenFolder: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @ViewChild("contextMenuForFolder", { static: false })
  contextMenuForFolder: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenuForFolder(event: MouseEvent, folder) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    console.log(this.contextMenuForFolder);
    this.contextMenuForFolder.menuData = { folder: folder };
    this.contextMenuForFolder.openMenu();
  }

  getIcon(fileName: string) {
    let fileNameParts = fileName.split('.');
    let extension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    switch (extension) {
      case "png": case "jpg": case "jpeg": case "gif":
        return "https://image.flaticon.com/icons/svg/2145/2145147.svg";
      case "mp4": case "mov": case "avi":
        return "https://image.flaticon.com/icons/svg/1329/1329922.svg";
      case "mp3": case "wav":
        return "https://image.flaticon.com/icons/svg/1705/1705098.svg";
      case "exe": case "msi":
        return "https://image.flaticon.com/icons/svg/1006/1006537.svg";
      case "doc": case "docx":
        return "https://image.flaticon.com/icons/svg/888/888883.svg";
      case "xls": case "xlsx":
        return "https://image.flaticon.com/icons/svg/732/732220.svg";
      case "ppt": case "pptx":
        return "https://image.flaticon.com/icons/svg/888/888874.svg";
      case "pdf":
        return "https://image.flaticon.com/icons/svg/337/337946.svg";
      case "zip": case "rar": case "7z": case "tar": case "gz":
        return "https://image.flaticon.com/icons/svg/136/136544.svg";
      case "iso":
        return "https://image.flaticon.com/icons/svg/136/136541.svg";
      default:
        return "https://image.flaticon.com/icons/svg/148/148964.svg";
    }
  }

}
