import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  public mobile:boolean;

  constructor(platform:Platform) { 

    if (platform.is('android') || platform.is('ios')) {
      this.mobile = true;
    }else{
      this.mobile = false;
    }

  }
}
