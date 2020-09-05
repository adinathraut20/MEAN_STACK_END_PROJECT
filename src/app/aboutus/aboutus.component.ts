import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})

/*
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/


export class AboutusComponent implements OnInit {

  public title = 'A2-app';
  public list: any = [];

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    console.log('ON.INIT.');
    this.makeAjaxCall();
  }

  async makeAjaxCall() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const results = await this.http.get(url).toPromise();
    this.list = results;
    console.log(results);
  }

  async makePostApiCall() {
    const userJson = {
      username: 'Akshay Kumar',
      email: 'akshay@gmail.com',
      password: '1234',
      mobile: '1233456',
    };

    const url = 'http://localhost:3000/adduser';
    const output = await this.http.post(url, userJson).toPromise();
    console.log(output);
  }
}





  // Services :: Injection :: Singelton :: Short Syntax
/*private http: HttpClient;
constructor(http: HttpClient) {
  this.http = http;
}*/