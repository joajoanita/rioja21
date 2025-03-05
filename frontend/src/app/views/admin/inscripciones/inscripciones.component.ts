import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminService} from '../../../service/Admin/admin.service';

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  inscripciones: any[] = [];
  constructor(
    private adminS: AdminService,
  ) {
  }

  ngOnInit(){
    this.indexUsuariosEnVoluntariados();
  }

  indexUsuariosEnVoluntariados(){
    this.adminS.indexUsuariosEnVoluntariados().subscribe(
      data => {
        this.inscripciones = data;
        console.log('Inscripciones', data);
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }


}
