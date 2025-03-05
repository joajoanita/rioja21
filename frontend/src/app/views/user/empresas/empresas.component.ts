import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {EmpresaService} from '../../../service/Empresa/empresa.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-empresas',
  imports: [RouterModule, CommonModule, NgxPaginationModule],
  standalone: true,
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {
  empresas: any[] = [];
  pagina: number = 1;
  constructor(private empresaService: EmpresaService) {}

  ngOnInit():void{
    this.indexEmpresas();
  }
  indexEmpresas(){
    this.empresaService.indexEmpresas().subscribe(
      data => {
        this.empresas = data;
        console.log('Success', data);
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }
}
