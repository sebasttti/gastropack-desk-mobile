import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/core/services/mobile.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {

  isMobile:string;

  constructor(mobileService:MobileService) {
      if (mobileService.mobile) {
        this.isMobile = 'Yo soy mobil';
      }else{
        this.isMobile = 'yo NO soy mobil';
      }
   }

  ngOnInit() {
        
  }

}
