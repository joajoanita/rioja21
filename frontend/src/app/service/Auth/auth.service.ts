import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User = new User();
  isLoggedIn: any;
  constructor(private http:HttpClient) { }

  register(postData: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/auth/register', postData);
  }

  login(User:User):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/auth/login', User);
  }

  userProfile():Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/auth/userProfile');
  }
}
