import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '../interfaces/user';
import { environment } from '../../enviroment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiBaseUrl;
    this.myApiUrl = 'users'
  }

  signIn(user: User) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }
}