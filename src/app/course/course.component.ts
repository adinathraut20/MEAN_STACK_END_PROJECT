import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courseList: any = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    if (Object.keys(sessionStorage).length == 0 || sessionStorage.sid == "false") {
      this.router.navigate(['login']);
    }
    this.courseDetailHtml();
  }


  async courseDetailHtml() {

    const url = 'http://localhost:8080/api/course';
    const results = await this.http.get(url).toPromise();
    this.courseList = results;
    //console.log(this.courseList);
  }

  async deleteCourse(Element1) {
    if (confirm("Are you sure want to delete?")) {
      console.log(Element1);
      var url = 'http://localhost:8080/deleteCourse';
      url = url + "?course_id=" + Element1;
      console.log(url);
      const results = await this.http.get(url).toPromise();
      console.log(results);
      window.location.reload();

    }
  }
}
