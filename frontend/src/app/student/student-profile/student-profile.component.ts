import { StudentServiceService } from '../../st-service/student.service';
import { AuthService } from '../../shared/auth.service';
import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from './student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ɵangular_packages_platform_browser_platform_browser_m } from '@angular/platform-browser';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  isLoading: boolean;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;

  id: string;
  image: '';
  changePhoto: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  changeOption(): void {
    this.changePhoto = !this.changePhoto;
  }
  readonly: boolean = true;
  update(): void {
    this.readonly = !this.readonly;
  }
  discard(): void {
    this.readonly = !this.readonly;
    this.ngOnInit();
  }

  studentUpdateForm: FormGroup;
  Student: StudentModel = {
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    Sex: '',
    State: '',
    District: '',
    PinCode: null,
    HighestQualification: '',
    PassOfYear: '',

    Course: '',
    DOB: '',
    Password: '',
    Suid: '',
    image: {
      data: {},
      contentType: '',
    },
    imageUrl: '',
    ApprovalDate: '',
    PaymentDate: '',
  };

  constructor(
    private _http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    public _auth: AuthService,
    private _studentService: StudentServiceService
  ) {}

  isAllowedToEdit(): void {
    if (
      this._auth.loggedIn() &&
      (this._auth.getUser() == 'admin' || this._auth.getUser() == 'user')
    ) {
      // console.log('true');
      this.showEditButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  isAdmin(): void {
    if (this._auth.loggedIn() && this._auth.getUser() == 'admin') {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isAllowedToEdit();
    this.isAdmin();
    this.changePhoto = false;
    this.readonly = true;
    this.id = this._ActivatedRoute.snapshot.params['_id'];

    this._studentService.fetchStudent(this.id).subscribe(
      (studentData: any) => {
        this.isLoading = false;
        if (studentData.error) {
          this._router.navigate(['/error'], { state: studentData });
        }
        this.Student = JSON.parse(JSON.stringify(studentData));
        this.Student.imageUrl = this.arrayBufferToBase64(
          this.Student.image.data.data
        );
        this.studentUpdateForm = new FormGroup({
          Sex: new FormControl(this.Student.Sex, [Validators.required]),
          Name: new FormControl(this.Student.Name, [Validators.required]),
          Email: new FormControl(this.Student.Email, [
            Validators.required,
            Validators.pattern(this.emailReg),
          ]),
          Phone: new FormControl(this.Student.Phone, [
            Validators.required,
            Validators.pattern(this.phoneReg),
          ]),
          State: new FormControl(this.Student.State, [Validators.required]),
          HighestQualification: new FormControl(
            this.Student.HighestQualification,
            [Validators.required]
          ),
          PassOfYear: new FormControl(this.Student.PassOfYear, [
            Validators.required,
            Validators.min(2010),
            Validators.max(2023),
          ]),

          Course: new FormControl(this.Student.Course, [Validators.required]),
          DOB: new FormControl(this.Student.DOB, [Validators.required]),

          Password: new FormControl(this.Student.Password, [
            Validators.required,
            Validators.pattern(this.passwordReg),
          ]),
        });
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire('danger!!', 'server refused to connect', 'error');
      }
    );
  }

  //*************************************************** */

  onUpdateStudent() {
    if (this.studentUpdateForm.invalid) {
      Swal.fire({
        title: 'inalid',
        text: 'form is invalid',
        icon: 'warning',
        timer: 1000,
        showConfirmButton: false,
      });
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this._studentService
      .editStudent(this.studentUpdateForm.value, this.Student._id)
      .subscribe(
        (studentData: any) => {
          this.isLoading = false;
          if (studentData.error) {
            Swal.fire({
              title: '🙄🙄🙄warning!!',
              text: 'something went wrong',
              icon: 'error',
              timer: 500,
              showConfirmButton: false,
            }).then((refresh) => {
              this.readonly = !this.readonly;
              this._router.navigate(['/error'], { state: studentData });
            });
          } else {
            Swal.fire({
              title: 'Good Job😉😉!!',
              text: 'profile updated successfully',
              icon: 'success',
              timer: 500,
              showConfirmButton: false,
            }).then((refresh) => {
              this.Student = JSON.parse(JSON.stringify(studentData));
              this.readonly = !this.readonly;
              this.ngOnInit();
            });
          }
        },
        (errorMessage) => {
          this.isLoading = false;
          Swal.fire({
            title: '🤦‍♂️🤦‍♂️🤦‍♂️danger!!',
            text: 'server error',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
          }).then((refresh) => {
            this.readonly = !this.readonly;
            this._router.navigate(['/']);
          });
        }
      );
  }
  //**************************    pic upload    ********************************/

  photoUpdateForm: FormGroup = new FormGroup({
    img: new FormControl(''),
  });
  async onImageUpload() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('img', this.photoUpdateForm.get('img')!.value);
    await this._studentService.uploadPic(formData, this.Student._id).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.status) {
        } else {
          Swal.fire({
            title: '🤦‍♂️🤦‍♂️error',
            text: 'server error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️error',
          text: 'server error',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    );
    setTimeout(() => {
      this.ngOnInit();
    }, 2000);
  }

  //************************** don't touch **************************************/
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.photoUpdateForm.get('img')!.setValue(this.image);
    }
  }
  arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  //**************************    on approve   ************************************** */

  onApprove(id, Course, Email) {
    this.isLoading = true;
    forkJoin([
      this._studentService.approvalMail(id, Course, Email),

      this._studentService.editStudent(
        {
          Student: { ApprovalDate: new Date(), Status: 'payment remaining' },
        },
        id
      ),
    ])
      .pipe(tap(console.log))
      .subscribe(
        (res) => {
          this.isLoading = false;
          Swal.fire({
            title: '😍❤❤',
            text: 'approved',
            timer: 500,
            showConfirmButton: false,
          });
        },
        (error) => {
          this.isLoading = false;
          Swal.fire({ title: '🤦‍♂️🤦‍♂️🤦‍♂️', text: 'server failed', timer: 1000 });
        }
      );
  }
  //********************************    on reject     **************************** */
  onReject(id, Course, Email) {
    this.isLoading = true;
    forkJoin([
      this._studentService.rejectionMail(id, Course, Email),
      this._studentService.deleteStudent(id),
    ])
      .pipe(tap(console.log))
      .subscribe(
        (res) => {
          this.isLoading = false;
          Swal.fire({
            title: 'rejected',
            text: 'done',
            icon: 'info',
            timer: 500,
            showConfirmButton: false,
          }).then(() => {
            this._router.navigate(['/approve']);
          });
        },
        (error) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Error🤦‍♂️🤦‍♂️',
            text: 'server error occured',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
        }
      );
  }

  //************************************************* */
  deleteProfile() {
    this._studentService.deleteStudent(this.Student._id).subscribe(
      (StudentData) => {
        this.isLoading = false;
        this._router.navigate([`/s`]);
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire('danger!!', 'some internal error', 'error').then(
          (refresh) => {
            this._router.navigate(['/']);
          }
        );
      }
    );
  }
}
