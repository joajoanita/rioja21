import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  indexEmpresas():Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/indexEmpresas');
  }

  showVoluntariadoByEmpresa(nombreEmpresa= ''): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/showVoluntariadoByEmpresa', {params: {buscar:nombreEmpresa}});
  }

}
