import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiurl = 'http://localhost:3000/user';
  apiurl = 'http://localhost:8080/api/employees';
  constructor(private http: HttpClient) { }
  GetAll(): Observable<Employee> {
    return this.http.get<Employee>(this.apiurl);
  }
  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code);

  }

  Proceedregistration(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }
  Updateuser(code: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + code, inputdata);
  }

  IsloggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  GetUserrole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  FindByUsername(username: any) {
    return this.http.get(this.apiurl + '/' + username);
  }

}
