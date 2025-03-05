import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor() { }

  private busquedaFiltro = new BehaviorSubject<string>('');
  busquedaActual = this.busquedaFiltro.asObservable();

  updateBusqueda(query: string){
    this.busquedaFiltro.next(query);
  }
}
