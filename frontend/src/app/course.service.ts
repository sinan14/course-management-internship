import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private _http: HttpClient) {}
  private _API = environment.apiUrl;
  fetchCourses() {
    return this._http.get(`${this._API}/courses`);
  }
  fetchCourseById(id: string) {
    return this._http.get(`${this._API}/courses/${id}`);
  }
  addCourse(course) {
    return this._http.post(`${this._API}/courses`, course);
  }
  updateCourse(course) {
    return this._http.patch(`${this._API}/courses/${course._id}`, {
      course: course,
    });
  }
  removeCourse(_id: string) {
    return this._http.delete(`${this._API}/courses/${_id}`);
  }
}
