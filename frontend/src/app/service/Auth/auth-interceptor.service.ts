import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private token: TokenService) { }

  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const accessToken = this.token.getToken();

    if (accessToken){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    } else {
      console.log('Token no encontrado')
    }
    return next.handle(req);
  }
}
