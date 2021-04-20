import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-citas-options-dialog',
  templateUrl: './citas-options-dialog.component.html',
  styleUrls: ['./citas-options-dialog.component.scss']
})
export class CitasOptionsDialogComponent implements OnInit {
  avilableOption: string;

  constructor(
    public dialogRef: MatDialogRef<CitasOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.showAvilableOption();
  }

  private showAvilableOption() {
    console.log(this.data.cita_estado_id);
    switch (this.data.cita_estado_id) {
      case '1':
        this.avilableOption = 'anular';
        break;

      case '2':
        this.avilableOption = 'none';
        break;

      case '3':
        this.avilableOption = 'realizar';
        break;

      case '4':
        this.avilableOption = 'realizar';
        break;

      case '5':
        this.avilableOption = 'none';
        break;

      default:
        break;
    }
  }

  closeOptions(option: string) {
    this.dialogRef.close({ option: `${option}` });
  }
}
