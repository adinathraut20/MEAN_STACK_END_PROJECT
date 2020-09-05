import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import {FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }
  /*
    title = 'loginPage';
  
    public nameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('[a-z]*')
    ])
  
  
    public readForm() {
      console.log();
      const username = this.nameControl.value;
  
      this.nameControl.setValue('');
    }
    */
  myFormGroup = new FormGroup({
    emailid: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('[a-z]+')      //^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$
    ])
  });

  async loginProcessHere() {
    const data = this.myFormGroup.value;

    // ajax call
    const url = 'http://localhost:8080/login';
    const result: any = await this.http.post(url, data).toPromise();
    console.log(result);
    if (result.message == "success") {
      sessionStorage.setItem('sid', 'true');
      sessionStorage.setItem('emailid', result.emailid);
      this.router.navigate(['home']);
    } else {
      alert("Invalid Username or Password");
      this.router.navigate(['login']);
    }
  }

  /*
    public readForm() {
      console.log();
      const username1 = this.myFormGroup.value;
      console.log(username1);
      // this.myFormGroup.setValue('');
    }*/

}


/*
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'loginPage';

*/