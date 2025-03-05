import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadoService {

  constructor(private http: HttpClient) { }

  indexVoluntariado(query=''):Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/indexVoluntariados', {params: {buscar:query}});
  }

  showVoluntariado(id:any):Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/user/detalleVoluntariado/${id}`);
  }

  inscribirseEnVoluntariado(data: any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/user/inscribirseEnVoluntariado', data);
  }
}
