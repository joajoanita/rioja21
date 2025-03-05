import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  deleteEmpresas(id:any):Observable<any>{
    return this.http.delete(`http://127.0.0.1:8000/api/admin/deleteEmpresa/${id}`)
  }

  createEmpresa(postData: any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/admin/createEmpresa', postData);
  }

  updateEmpresa(id:any, data: any):Observable<any>{
    return this.http.put(`http://127.0.0.1:8000/api/admin/updateEmpresa/${id}`,data);
  }

  deleteVoluntariado(id:any):Observable<any>{
    return this.http.delete(`http://127.0.0.1:8000/api/admin/deleteVoluntariado/${id}`);
  }

  updateVoluntariado(id:any, data: any):Observable<any>{
    return this.http.put(`http://127.0.0.1:8000/api/admin/updateVoluntariado/${id}`, data);
  }

  createVoluntariado(data:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/admin/createVoluntariado', data);
  }

  indexUsuariosEnVoluntariados():Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/admin/indexUsuariosEnVoluntariados');
  }
}
