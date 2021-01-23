import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Evenement} from '../models/evenement.model';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };
  send: EventEmitter<any> = new EventEmitter<any>();
  layoutEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private httpClient: HttpClient) { }

  login(user: User): any {
    return this.httpClient.post<User>(`http://localhost:9999/api/auth/signin`, user).toPromise();
  }

  logout(): any {
    localStorage.clear();
  }

  register(user: User): any {
    return this.httpClient.post<User>(`http://localhost:9999/api/auth/signup`, user).toPromise();
  }

  remove(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/api/auth/deleteUser/${id}`).toPromise();
  }

  update(user: User,id: any): Promise<User> {
    return this.httpClient.put<User>(`http://localhost:9999/api/auth/updateUser/${id}`, user).toPromise();
  }

  getUser(email: string): Promise<User> {
    return this.httpClient.get<User>(`http://localhost:9999/api/auth/getByEmail/${email}`).toPromise();
  }

}
