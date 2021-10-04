import { Component, OnInit } from "@angular/core";
import { CourseService } from "../course.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses: any;

  constructor(private _courseService: CourseService) {}

  ngOnInit(): void {
    this._courseService.fetchCourses().subscribe(
      (res: any) => {
        if (res.status == "success") {
          this.courses = res.data.courses;
        } else {
          Swal.fire({
            icon: "error",
            text: "something went wrong",
            title: "OOPS!!",
            showConfirmButton: true,
          });
        }
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          text: "server not connected",
          title: "OOPS!!",
          showConfirmButton: true,
        });
      }
    );
  }
}
