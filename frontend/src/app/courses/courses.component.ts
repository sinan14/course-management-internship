import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { CourseService } from "../course.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
  courses: any;

  constructor(private _courseService: CourseService) {}

  ngOnInit(): void {
    this._courseService.fetchCourses().subscribe(
      (res: any) => {
        if (res.status === "success") {
          console.log(res);
          this.courses = res.data.courses;
        } else {
          Swal.fire({
            icon: "error",
            text: "something went wrong",
            title: "OOPS!!",
          });
        }
      },
      (ERROR: any) => {
        Swal.fire({
          icon: "error",
          text: "server not connected",
          title: "OOPS!!",
        });
      }
    );
  }
  deleteCourse(_id) {
    this._courseService.removeCourse(_id).subscribe(
      (res: any) => {
        if (res.status == "success") {
          Swal.fire({
            icon: "success",
            text: res.data,
            title: "Done",
            showConfirmButton: true,
          }).then(() => {
            this.ngOnInit();
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "error occured",
            title: "OOPS",
            showConfirmButton: true,
          });
        }
      },
      (er: any) => {
        Swal.fire({
          icon: "error",
          text: "server not connected",
          title: "OOPS!!",
        });
      }
    );
  }
}
