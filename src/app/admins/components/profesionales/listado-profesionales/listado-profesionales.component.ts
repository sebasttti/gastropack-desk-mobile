import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { OpcionesPersonaDialogComponent } from '../../dialogs/opciones-persona-dialog/opciones-persona-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AgregarPersonaDialogComponent } from '../../dialogs/agregar-persona-dialog/agregar-persona-dialog.component';
import { VerPersonaDialogComponent } from '../../dialogs/ver-persona-dialog/ver-persona-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styles: []
})
export class ListadoProfesionalesComponent
  implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'estado', 'opciones'];
  dataSource = new MatTableDataSource();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isHandsetValue: boolean;
  subscriptions = [];
  listadoProfesionales: Persona[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private httpRequest: HttpRequestService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  // ===================================

  async init() {
    await this.handsetSubscribre();
    this.mostrarProfesionales();
  }

  private mostrarProfesionales() {
    const data = new FormData();

    const url = environment.apiUrl + '/Admins/Profs/mostrarProfesionales/';

    this.httpRequest
      .postRequest(url, data)
      .pipe(
        map(response => {
          if (response.status === 'success') {
            return response.message as Persona[];
          } else {
            console.log(response.message);
            return [];
          }
        })
      )
      .subscribe(response => {
        this.listadoProfesionales = response;
        this.dataSource.data = this.listadoProfesionales;
      });
  }

  private handsetSubscribre() {
    return new Promise(resolve => {
      const obs1 = this.isHandset$.subscribe(value => {
        this.isHandsetValue = value;
        resolve(true);
      });

      this.subscriptions.push(obs1);
    });
  }

  // ==================================

  verPersona(id) {
    const persona = this.listadoProfesionales.find(
      prof => prof.persona_id === id
    );

    this.dialog.open(VerPersonaDialogComponent, {
      width: this.isHandsetValue ? '90%' : '700px',
      data: { persona, persona_tipo: 'profesional' }
    });
  }

  opcionesProfesional(id) {
    const persona_estado_id = this.listadoProfesionales.find(
      prof => prof.persona_id === id
    ).persona_estado_id;

    const opcionesProfesional = this.dialog.open(
      OpcionesPersonaDialogComponent,
      {
        width: this.isHandsetValue ? '90%' : '500px',
        data: {
          persona_id: `${id}`,
          persona_estado_id: `${persona_estado_id}`,
          persona_tipo: 'profesional'
        }
      }
    );

    opcionesProfesional.afterClosed().subscribe(res => {
      if (res) {
        let url = '';
        const data = new FormData();

        data.append('profesional_id', id);

        switch (res.option) {
          case 'anular':
            url = environment.apiUrl + '/Admins/Profs/suspenderProfesional/';
            break;

          case 'activar':
            url = environment.apiUrl + '/Admins/Profs/activarProfesional/';
            break;

          default:
            break;
        }

        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.mostrarProfesionales();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }

  agregarProfesional() {
    const agregarPersona = this.dialog.open(AgregarPersonaDialogComponent, {
      width: this.isHandsetValue ? '90%' : '700px',
      data: { persona_tipo: 'profesional' }
    });

    agregarPersona.afterClosed().subscribe(data => {
      if (data) {
        const url = environment.apiUrl + '/Admins/Profs/agregarProfesional/';
        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.mostrarProfesionales();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableFilterPlaceHolder() {
    return 'Ej. Antonio';
  }
}
