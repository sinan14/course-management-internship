import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  public _API = environment.apiUrl;

  constructor(private _http: HttpClient, private _router: Router) {}

  register(EmployeeDetails: any) {
    return this._http.post(`${this._API}/professors/register`, EmployeeDetails);
  }
  fetchEmployee(id: any) {
    return this._http.get(`${this._API}/professors/` + id);
  }

  fetchEmployees() {
    return this._http.get(`${this._API}/professors`);
  }

  deleteEmployee(id: any) {
    return this._http.delete(`${this._API}/professors/` + id);
  }
  editEmployee(changedDetails: any, id: any) {
    console.log("client update");
    return this._http.put(`${this._API}/professors/${id}`, changedDetails);
  }
}
