import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // backendUrl = 'http://localhost:3000';
  backendUrl = '/api';

  constructor(private _http: HttpClient, private _router: Router) {}
  fetchEmployee(id: any) {
    return this._http.get(`${this.backendUrl}/employee/` + id);
  }

  fetchEmployees() {
    return this._http.get(`${this.backendUrl}/employee`);
  }

  deleteEmployee(id: any) {
    return this._http.delete(`${this.backendUrl}/employee/` + id);
  }
  editEmployee(changedDetails: any, id:any) {
    console.log('client update');
    return this._http.put(`${this.backendUrl}/employee/${id}`, changedDetails);
  }
}
