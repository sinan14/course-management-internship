import { StudentServiceService } from '../../st-service/student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { NgLocaleLocalization } from '@angular/common';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css'],
})
export class StudentPaymentComponent implements OnInit {
  isLoading: boolean = false;

  paymentForm: FormGroup;
  cardReg = /\b(?:\d[ -]*?){13,16}\b/;

  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;

  isValid(controlName) {
    return (
      this.paymentForm.get(controlName).invalid &&
      this.paymentForm.get(controlName).touched
    );
  }
  //****************************************** */
  id: string;
  fee: number;
  elevatedFee: number;
  womenFee: number;
  studentId: string;
  courseFee = {
    MeanStack: 21000,
    CyberSecurity: 24000,
    DataScience: 30000,
    Robotics: 25000,
    DigitalMarketing: 20000,
  };
  Student = {
    _id: '',
    Name: '',
    Email: '',
    Course: '',
    State: '',
    Post: '',
    PinCode: '',
    District: '',
    Sex: '',

    Status: 'Active',
    PaymentDate: new Date(),
  };
  constructor(
    private _studentService: StudentServiceService,
    private _router: Router,
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute
  ) {}

  onPayment() {
    this.isLoading = true;
    if (this.paymentForm.invalid) {
      Swal.fire({
        title: '🤦‍♂️🤦‍♂️🤦‍♂️danger!!',
        timer: 1000,
        showConfirmButton: false,
        text: 'invalid credit card and details',
        icon: 'error',
      });
      // console.log(this.paymentForm.value);
      // window.location.reload();
      this.isLoading = false;
      return;
    }
    this._studentService.onPayment(this.Student).subscribe(
      (response) => {
        this.isLoading = false;
        if (response) {
          this.isLoading = false;
          Swal.fire({
            title: 'Good Job✌✌✌',
            icon: 'success',
            text: 'payment accepted ,check your mail for login credentials',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this._router.navigate(['/login']);
          });
        } else {
          this.isLoading = false;
          Swal.fire({
            title: '🤦‍♂️🤦‍♂️error',
            icon: 'error',
            text: 'something went wrong',
          });
        }
      },
      (errorMessage) => {
        this.isLoading = false;

        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️danger!!',
          timer: 1000,
          showConfirmButton: false,
          text: 'some internal error',
          icon: 'error',
        });
      }
    );
  }

  ngOnInit(): void {
    //fetching student
    this.isLoading = true;
    this.id = this._activatedRoute.snapshot.params['_id'];
    this._studentService.fetchStudent(this.id).subscribe(
      (studentData: any) => {
        this.isLoading = false;
        if (studentData.error) {
          this.isLoading = false;
          this._router.navigate(['/error'], { state: studentData });
        }
        this.isLoading = false;
        this.Student = JSON.parse(JSON.stringify(studentData));
        this.fee = this.courseFee[this.Student.Course];
        this.elevatedFee = this.fee * (10 / 100) + this.fee;

        this.womenFee = this.fee / 2;
        //
        this.paymentForm = new FormGroup({
          billName: new FormControl(null, [Validators.required]),
          email: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.emailReg),
          ]),
          address: new FormControl(null, [
            Validators.required,
            Validators.minLength(1),
          ]),
          state: new FormControl(null, [Validators.required]),
          district: new FormControl(null, [Validators.required]),
          zip: new FormControl(null, [
            Validators.required,
            Validators.max(999999),
            Validators.min(100000),
          ]),

          name: new FormControl(null, [Validators.required]),
          cardnumber: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.cardReg),
          ]),
          month: new FormControl(null, [
            Validators.required,
            Validators.max(12),
            Validators.min(1),
          ]),
          year: new FormControl(null, [
            Validators.required,
            Validators.min(2021),
            Validators.max(2050),
          ]),
          cvv: new FormControl(null, [
            Validators.required,
            Validators.min(100),
            Validators.max(999),
          ]),
        });
        //***********************                                 ************************* */

        this.paymentForm.patchValue({
          billName: this.Student.Name,
          email: this.Student.Email,
          state: this.Student.State,
          district: this.Student.District,
          zip: this.Student.PinCode,
        });
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️danger!!',
          text: 'some internal error',
          timer: 1000,
          showConfirmButton: false,
          icon: 'error',
        });
      }
    );
    //****************************form */
  }
}
