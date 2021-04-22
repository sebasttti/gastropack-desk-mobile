import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './services/test.service';
import { HttpRequestService } from './services/http-request.service';
import { UserloginService } from './services/userlogin.service';
import { NotificationsService } from './services/notifications.service';
import { HandsetService } from './services/handset.service';
import { UnsubscribeService } from './services/unsubscribe.service';
import { MobileService } from './services/mobile.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    TestService,
    HttpRequestService,
    UserloginService,
    NotificationsService,
    HandsetService,
    UnsubscribeService,
    MobileService
  ]
})
export class CoreModule {}
