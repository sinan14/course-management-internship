import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  backendUrl = 'http://localhost:3000';
  // backendUrl = '/api';

  constructor(private _http: HttpClient, private _router: Router) {}
  fetchStudent(id: any) {
    return this._http.get(`${this.backendUrl}/students/` + id);
  }

  fetchStudents() {
    return this._http.get(`${this.backendUrl}/students`);
  }
  editStudent(Student: any, id) {
    // console.log('client update');
    return this._http.put(`${this.backendUrl}/students/${id}`, { Student });
  }
  uploadPic(pic: any, id: any) {
    // console.log(pic);
    return this._http.put(`${this.backendUrl}/students/${id}/profilepic`, pic);
  }
  approvalMail(id, Course, Email) {
    return this._http.post(`${this.backendUrl}/students/${id}/approve/`, {
      Student: { Email: `${Email}`, Course: `${Course}` },
    });
  }
  rejectionMail(id, Course, Email) {
    return this._http.post(`${this.backendUrl}/students/${id}/reject/`, {
      Student: { Email: `${Email}`, Course: `${Course}` },
    });
  }

  deleteStudent(id: any) {
    return this._http.delete(`${this.backendUrl}/students/` + id);
  }

  onPayment(studentPaymentInfo) {
    return this._http.put(
      `${this.backendUrl}/students/${studentPaymentInfo._id}/pay`,
      {
        Student: {
          Course: `${studentPaymentInfo.Course}`,
          Email: `${studentPaymentInfo.Email}`,
          Status: 'Active',
          PaymentDate: new Date(),
        },
      }
    );
  }
}
