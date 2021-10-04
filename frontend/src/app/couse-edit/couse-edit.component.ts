import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from "@angular/router";

import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { CourseService } from "../course.service";

@Component({
  selector: "app-couse-edit",
  templateUrl: "./couse-edit.component.html",
  styleUrls: ["./couse-edit.component.css"],
})
export class CouseEditComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  course:any;

  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}
  courseForm = this._fb.group({
    _id: ["", Validators.required],
    title: ["", Validators.required],
    duration: ["", Validators.required],
    fee: ["", [Validators.required]],
    ageLimit: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });

  ngOnInit(): void {
    let id;
    this.paramsSubscription = this._route.params.subscribe((params: Params) => {
      id = params["id"];
    });
    this._courseService.fetchCourseById(id).subscribe(
      (res: any) => {
        if (res.status == "success") {
          this.course=JSON.parse(JSON.stringify(res.data.course));
          this.courseForm.patchValue({
            _id: this.course._id,
            title: this.course.title,
            duration: this.course.duration,
            fee: this.course.fee,
            ageLimit: this.course.ageLimit,
            description: this.course.description,
          });
        } else {
          Swal.fire({
            title: "oops",
            icon: "error",
            text: res.data,
            showConfirmButton: true,
          }).then();
        }
      },
      (error: any) => {
        Swal.fire({
          title: "oops",
          icon: "error",
          text: "server error",
          showConfirmButton: true,
        }).then();
      }
    );
  }
  updateCourse() {
    if (this.courseForm.invalid) {
      return;
    } else {
      this._courseService.updateCourse(this.courseForm.value).subscribe(
        (res: any) => {
          if (res.status) {
            console.log(res);
            Swal.fire({
              icon: "success",
              text: 'successfully updated',
              timer: 1000,
              showConfirmButton: false,
            })
            .then(() => {
              this._router.navigate(["/admin/courses"], {
                relativeTo: this._route,
              });
            });
          } else {
            Swal.fire({
              title: "oops",
              icon: "error",
              text: res.data,
              showConfirmButton: true,
            }).then();
          }
        },
        (error: any) => {
          Swal.fire({
            title: "oops",
            icon: "error",
            text: "server error",
            showConfirmButton: true,
          }).then();
        }
      );
    }
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
