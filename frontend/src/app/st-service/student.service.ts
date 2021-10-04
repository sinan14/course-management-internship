import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentServiceService {
  public _API = environment.apiUrl;
  constructor(private _http: HttpClient, private _router: Router) {}
  fetchStudent(id: any) {
    console.log(id);
    return this._http.get(`${this._API}/students/${id}`);
  }

  fetchStudents() {
    console.log(`${this._API}/students`)
    return this._http.get(`${this._API}/students`);
  }
  editStudent(Student: any, id) {
    // console.log('client update');
    return this._http.put(`${this._API}/students/${id}`, { Student });
  }
  uploadPic(pic: any, id: any) {
    // console.log(pic);
    return this._http.put(`${this._API}/students/${id}/profilepic`, pic);
  }
  approvalMail(id, Course, Email) {
    return this._http.post(`${this._API}/students/${id}/approve/`, {
      Student: { Email: `${Email}`, Course: `${Course}` },
    });
  }
  rejectionMail(id, Course, Email) {
    return this._http.post(`${this._API}/students/${id}/reject/`, {
      Student: { Email: `${Email}`, Course: `${Course}` },
    });
  }

  deleteStudent(id: any) {
    return this._http.delete(`${this._API}/students/` + id);
  }

  onPayment(studentPaymentInfo) {
    return this._http.put(
      `${this._API}/students/${studentPaymentInfo._id}/pay`,
      {
        Student: {
          Course: `${studentPaymentInfo.Course}`,
          Email: `${studentPaymentInfo.Email}`,
          Status: "Active",
          PaymentDate: new Date(),
        },
      }
    );
  }
}
