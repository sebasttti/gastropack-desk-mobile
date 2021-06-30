import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  constructor(
    private deviceService: DeviceService,
    private statusBar: StatusBar
  ) { }

  public setStatusBar() {
    if (this.deviceService.mobile) {
      this.statusBar.overlaysWebView(false);     
    }
  }

  public setStatusBarColor(){
    //SE configura temporalmente unicamente para el usuario
    this.statusBar.backgroundColorByHexString('#d1d1d1');
  }
}
