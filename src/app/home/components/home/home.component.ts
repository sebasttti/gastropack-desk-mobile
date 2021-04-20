import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from 'src/app/shared/components/dialogs/basic-dialog/basic-dialog.component';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { map } from 'rxjs/operators';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { resolve } from 'url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeForm: FormGroup;
  userLogin$;

  constructor(
    private formBuilder: FormBuilder,
    private userLogged: UserloginService,
    private router: Router,
    private dialog: MatDialog,
    private title: Title,
    private overlayContainer: OverlayContainer,
    private httpRequest: HttpRequestService
  ) {
    this.setTitle();
    this.setMaterialContainer();
  }

  private setTitle() {
    this.title.setTitle('Gastropack Inicio');
  }

  setMaterialContainer() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('default-material-container');
  }

  private redirectUser(userType: any) {
    const nUserType = parseInt(userType, 10);

    switch (nUserType) {
      case 1:
        this.router.navigate(['/users']);
        break;

      case 2:
      case 3:
      case 4:
      case 5:
        this.router.navigate(['/profs']);
        break;
      case 6:
        this.router.navigate(['/admins']);
        break;
      default:
        break;
    }
  }

  private buildForm() {
    this.homeForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.init();
    this.buildForm();
  }

  async init() {
    await this.tB();
    this.userLogged.verifyUserLogged().then(result => {
      if (result) {
        // existe un usuario logueado
        this.userLogged.userLoggedObs$.subscribe(userInfo => {
          this.userLogin$ = userInfo;
        });
        this.redirectUser(this.userLogin$.type);
      }
    });
  }

  tB() {

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(environment.tokenUrl, data)
        .pipe(map(result => result as any))
        .subscribe(response => {
          const token = response.mensaje;
          if (token === 'va24ehe') {
            resolve(true);
          } else {
            this.router.navigate(['/tryout']);
          }
        });
    });
  }

  sendForm() {
    if (this.homeForm.valid) {
      this.userLogged.checkLogin(this.homeForm.value).then(response => {
        if (response) {
          window.location.reload();
        } else {
          this.dialog.open(BasicDialogComponent, {
            data: { content: 'Por favor revisa tu usario y contraseña' }
          });
        }
      });
    } else {
      this.dialog.open(BasicDialogComponent, {
        data: { content: 'Por favor revisa tu usario y contraseña' }
      });
    }
  }
}
