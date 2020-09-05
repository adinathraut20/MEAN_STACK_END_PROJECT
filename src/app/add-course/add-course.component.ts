import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (Object.keys(sessionStorage).length == 0 || sessionStorage.sid == "false") {
      this.router.navigate(['login']);
    }
  }

  CourseForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.pattern("[0-9]+(\.[0-9]+)?")
    ]),
    img: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(250),
    ]),
    video: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(250),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(250),
    ]),
    email: new FormControl('', [])
  });


  async Save() {
    // this.CourseForm.value.email = sessionStorage.getItem('email');
    const data = this.CourseForm.value;
    data['email'] = sessionStorage.getItem('emailid');

    //console.log(sessionStorage.email);
    // console.log(data);
    if (sessionStorage.sid == "true") {
      // ajax call
      const url = 'http://localhost:8080/api/addCourse';
      const result: any = await this.http.post(url, data).toPromise();
      //console.log(result);
      this.router.navigate(['course']);


    } else {
      alert("Session Expired! Please Login Again");
      this.router.navigate(['login']);

    }

  }

}
