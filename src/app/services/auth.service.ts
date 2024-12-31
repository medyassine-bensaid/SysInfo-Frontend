import { Injectable } from '@angular/core';
import { LoginModel } from '../models/LoginModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../models/AuthenticatedResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5131/api/Auth/login';

  constructor(private http:HttpClient  ){

  }

  login(credentials: LoginModel): Observable<AuthenticatedResponse> {
    console.log('Sending credentials:', credentials); // Debug log
    

    return this.http.post<AuthenticatedResponse>(this.apiUrl, credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
      
    });
  }
}