import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoluntariadoService} from '../../../service/Voluntariado/voluntariado.service';
import {AdminService} from '../../../service/Admin/admin.service';
import {RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-voluntariado',
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent {
  voluntariados: any[] = [];
  constructor(private voluntariadoService: VoluntariadoService, private adminService: AdminService) {
  }

  ngOnInit(){
    this.indexVoluntariado();
  }

  indexVoluntariado(){
    this.voluntariadoService.indexVoluntariado().subscribe(
      data => {
        this.voluntariados = data;
        console.log('Voluntariados: ', data)
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }

  deleteVoluntariado(id:any){
    this.adminService.deleteVoluntariado(id).subscribe(
      response => {
        console.log('Voluntariado eliminado con éxito', id);
        this.indexVoluntariado();
      },
      error => {
        console.log('Ha ocurrido un error eliminado el voluntariado', error);
      }
    );
  }

}
