import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api: string = 'http://localhost:3000';
  // api = '/api';

  constructor(private _http: HttpClient, private _router: Router) {}
  //*************** register professor and student ***************/

  toStudentProfile() {
    const id = this.getId();
    this._router.navigate([`/students/${id}`]);
  }
  toEmployeeProfile() {
    const id = this.getId();
    this._router.navigate(['/employees/' + id]);
  }
  getId() {
    return localStorage.getItem('navigator');
  }
  getName() {
    return localStorage.getItem('Name');
  }
  logOut() {
    const name = this.getName();
    if (name == null) {
      const name = 'Admin';
    }
    Swal.fire({
      title: '😪',
      text: `bye ${name} we will miss you`,
      timer: 1000,
      showConfirmButton: false,
    }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('navigator');
      localStorage.removeItem('Name');
      this._router.navigate(['/login']);
    });
  }
  //*********************************        register ********************************/

  registerUser(StudentDetails: any) {
    return this._http.post(`${this.api}/students/register`, StudentDetails);
  }
  registerEmployee(EmployeeDetails: any) {
    return this._http.post(`${this.api}/professor/register`, EmployeeDetails);
  }

  //************************** login professor and student *******************/


  loginProfessor(user: any) {
    return this._http.post<any>(`${this.api}/professor/login`, user);
  }

  //************************** reset professor and student password  ********************/

  resetStudentPassword(user: any) {
    return this._http.put<any>(`${this.api}/students/reset`, user);
  }
  resetEmployeePassword(user: any) {
    return this._http.put<any>(`${this.api}/professor/reset`, user);
  }

  //************************** checking authentication  *******************/

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUser() {
    return localStorage.getItem('role');
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  
  loginStudent(student: any) {
    return this._http.post<any>(`${this.api}/students/login`,student);
  }

  checkAdmin() {
    return !!localStorage.getItem('admin');
  }
}
