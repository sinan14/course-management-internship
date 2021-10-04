import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { EmployeeService } from "../st-service/employee.service";

@Component({
  selector: "app-all-professor",
  templateUrl: "./all-professor.component.html",
  styleUrls: ["./all-professor.component.css"],
})
export class AllProfessorComponent implements OnInit {
  isLoading: boolean = false;
  profs:any;
   

  constructor(
    private _http: HttpClient,
    private router: Router,
    private _profService: EmployeeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this._profService.fetchEmployees().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.profs = JSON.parse(JSON.stringify(data));
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          title: "error!!!🤦‍♂️🤦‍♂️🤦‍♂️",
          text: "server refused to connect",
          timer: 800,
          icon: "error",
          showConfirmButton: false,
        });
      }
    );
  }
}
