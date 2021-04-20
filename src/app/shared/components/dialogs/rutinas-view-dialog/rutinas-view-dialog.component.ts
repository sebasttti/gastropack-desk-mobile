import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rutinas-view-dialog',
  templateUrl: './rutinas-view-dialog.component.html',
  styleUrls: ['./rutinas-view-dialog.component.scss']
})
export class RutinasViewDialogComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<RutinasViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imgExtensions = [];
  ngOnInit() {
    this.imgExtensions = environment.supportedImages;
  }

  getVideoIframe(url) {
    let video;
    let results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }
}
