import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  api: string = 'http://localhost:3000';
  //dont touch
  isTrainerApproved() {
    return !!sessionStorage.getItem('approved');
  }
  constructor(private _http: HttpClient) {}
  newTrainer(item: any) {
    return this._http.post(`${this.api}/trainers/signup`, { trainer: item });
  }
  newEnrollment(fd: any) {
    console.log(fd);
    return this._http.post<any>(`${this.api}/trainers/enroll`, fd);
    // return this._http.post<any>(`${this.api}/trainers/request`, fd);
  }
  checkApprovalStatus(Email: any) {
    return this._http.get(`${this.api}/trainers/approvedList/${Email}/check`);
  }
  isDateAlreadyTaken(email: any) {
    return this._http.get(
      `${this.api}/trainers/allocatedList/${email}/checkDates`
    );
  }

  getTrainers() {
    return this._http.get(`${this.api}/trainers/all`);
  }
  getTrainer(email) {
    return this._http.get(`${this.api}/trainers/${email}/one`);
  }

  editTrainerProfile(form: any, email) {
    console.log(form);
    return this._http.post(`${this.api}/trainers/${email}/edit`, form);
  }

  //adminControl
  Remove(email: any) {
    return this._http.delete(`${this.api}/admin/trainers/${email}/remove`);
  }

  getNumbers() {
    console.log('hi');
    return this._http.get(`${this.api}/admin/trainers/getnumbers`);
  }
  getRequestList() {
    return this._http.get(`${this.api}/admin/trainers/requests`);
  }
  getApprovalRequest(email: any) {
    return this._http.get(`${this.api}/admin/trainers/requests/${email}`);
  }

  Reject(email: any) {
    return this._http.delete(
      `${this.api}/admin/trainers/requests/${email}/reject`
    );
  }

  Approve(trainer: any) {
    return this._http.post(
      `${this.api}/admin/trainers/requests/${trainer.email}/approve`,
      trainer
    );
  }
  //ok

  allocateTrainer(allocationDetails: any) {
    console.log(allocationDetails.email)
    return this._http.post(
      `${this.api}/admin/trainers/${allocationDetails.email}/allocate`,
      allocationDetails
    );
  }

  //
  getAllocatedlist() {
    return this._http.get(`${this.api}/admin/trainers/allocatedList`);
  }
  showSchedule(email: any) {
    return this._http.get(
      `${this.api}/trainers/allocatedList/${email}/schedule`
    );
  }

  //search dont touch

  searchByName(name: any) {
    return this._http.get(`${this.api}/search/${name}`);
  }

  searchBySkill(skill: any) {
    console.log(skill);
    return this._http.get(`${this.api}/search/skill/${skill}`);
  }
  searchByType(typeemp: any) {
    return this._http.get(`${this.api}/search/type/${typeemp}`);
  }
  searchByCourse(course: any) {
    return this._http.get(`${this.api}/search/course/${course}`);
  }

  searchTrainer(search:any){
    console.log(search)
    return this._http.get(`${this.api}/search/all/${search}`)
  }
}
//
// item = {
//   traineremail: '',
//   trainerusername: '',
//   trainerpass: '',
// };
