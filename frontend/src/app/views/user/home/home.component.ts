import { Component } from '@angular/core';
import {VoluntariadoService} from '../../../service/Voluntariado/voluntariado.service';
import {RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {Subscription} from 'rxjs';
import {BusquedaService} from '../../../service/Filtro/busqueda.service';


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

  buscarQuery: string = '';
  busqueda: Subscription | undefined;
  constructor(private voluntariadoService: VoluntariadoService, private busquedaServicio: BusquedaService) { }

  ngOnInit(): void{
    this.busqueda = this.busquedaServicio.busquedaActual.subscribe(
      query => {
        this.buscarQuery = query;
        this.indexVoluntariado();
      }
    );
    this.indexVoluntariado();
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

}
