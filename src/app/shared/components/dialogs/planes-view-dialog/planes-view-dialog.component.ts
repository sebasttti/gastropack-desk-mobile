import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-planes-view-dialog',
  templateUrl: './planes-view-dialog.component.html',
  styleUrls: ['./planes-view-dialog.component.scss']
})
export class PlanesViewDialogComponent implements OnInit {
  imgExtensions = environment.supportedImages;

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PlanesViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

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
