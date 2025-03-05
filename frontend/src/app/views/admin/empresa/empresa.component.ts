import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EmpresaService} from '../../../service/Empresa/empresa.service';
import {AdminService} from '../../../service/Admin/admin.service';

@Component({
  selector: 'app-empresa',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {
    empresas: any[] = [];
    constructor(private empresaService: EmpresaService, private adminService: AdminService) {
    }

    ngOnInit(){
      this.indexEmpresas();
    }

    indexEmpresas(){
      this.empresaService.indexEmpresas().subscribe(
        data => {
          this.empresas = data;
          console.log('Empresas: ', data);
        },
        error => {
          console.log('Ha ocurrido un error: ', error);
        }
      );
    }

    deleteEmpresa(id:any){
      this.adminService.deleteEmpresas(id).subscribe(
        () => {
          this.indexEmpresas();
          console.log(`Se ha eliminado la empresa con id ${id}`);
        },
        error => {
          console.error('No se ha podido eliminar la actividad', error);
        }
      );
    }
}
