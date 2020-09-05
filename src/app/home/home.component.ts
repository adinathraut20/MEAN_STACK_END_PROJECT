import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient) { }

  public courseList: any = [];
  public urlV: any = [];

  ngOnInit(): void {
    if (Object.keys(sessionStorage).length == 0 || sessionStorage.sid == "false") {
      this.router.navigate(['login']);
    }
    this.courseDetailVideoHtml();

  }
  url = "/assets/mobile.png";

  async courseDetailVideoHtml() {

    const url = 'http://localhost:8080/api/courseVideourl';
    const results = await this.http.get(url).toPromise();
    this.courseList = results;
    /*for (let i = 0; i < Object.keys(results).length; i++) {
      this.courseList = results[i];
    }*/
    //{{this.courseList[0].Title}}

  }

}
