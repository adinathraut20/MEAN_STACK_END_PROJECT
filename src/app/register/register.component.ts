import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public uiInvalidCredential = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  myFormGroup = new FormGroup({
    emailid: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.pattern("[a-zA-Z]{1,20}")
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.pattern("[a-zA-Z]{1,20}")
    ]),
    cpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.pattern("[a-zA-Z0-9@#%&+]+")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('[a-zA-Z0-9@#%&+]+')      //^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern("[0-9]{8,15}")
    ]),
  });

  async loginProcessHere() {
    const data = this.myFormGroup.value;
    if (data.password == data.cpassword) {
      // ajax call
      const url = 'http://localhost:8080/signup';
      const result: any = await this.http.post(url, data).toPromise();
      console.log(result);
      if (result.mssg == "success") {
        this.router.navigate(['login']);
      } else {
        alert("User Email-Id already Exists try Another Email");
        this.router.navigate(['register']);
      }
    }
    else {
      alert("Password MissMatch");
    }
  }


}
