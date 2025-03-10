import { Component } from '@angular/core';
import {VoluntariadoService} from '../../../service/Voluntariado/voluntariado.service';
import {RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {Subscription} from 'rxjs';
import {BusquedaService} from '../../../service/Filtro/busqueda.service';
import {EmpresaService} from '../../../service/Empresa/empresa.service';


@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  voluntariados: any[] = [];
  pagina: number = 1;
  empresas: any[] = [];
  buscarQuery: string = '';
  busqueda: Subscription | undefined;
  changeColor: string | null = null;
  errorMessage!: string;
  constructor(private voluntariadoService: VoluntariadoService, private busquedaServicio: BusquedaService, private empresaService: EmpresaService) { }

  ngOnInit(): void{
    this.busqueda = this.busquedaServicio.busquedaActual.subscribe(
      query => {
        this.buscarQuery = query;
        this.indexVoluntariado();
      }
    );
    this.indexVoluntariado();
    this.indexEmpresas();
  }

  ngOnDestroy(){
    if(this.busqueda){
      this.busqueda.unsubscribe();
    }
  }
  indexVoluntariado(){
    this.voluntariadoService.indexVoluntariado(this.buscarQuery).subscribe(
      (data) => {
        this.voluntariados = data;
        console.log("Success", data);
        console.log(this.buscarQuery);
      },
      (error) => {
        console.log('Error al recuperar la información del voluntariado', error);
      }
    );
  }

  filtroPorEmpresa(nombreEmpresa: string){
    this.empresaService.showVoluntariadoByEmpresa(nombreEmpresa).subscribe(
      data => {
        this.voluntariados = data.voluntariado;
        this.changeColor = nombreEmpresa;
      },
      error => {
        console.error('Error al filtrar actividades', error);
      }
    );
  }

  indexEmpresas() {
    this.empresaService.indexEmpresas().subscribe(
      data => {
        this.empresas = data;
        console.log(this.empresas);
      },
      error => {
        this.errorMessage = error.error;
      }
    );
  }

}
