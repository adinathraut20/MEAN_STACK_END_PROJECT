import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { FooterComponent } from './footer/footer.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [{ path: "login", component: LoginComponent },
{ path: "register", component: RegisterComponent },
{ path: "header", component: HeaderComponent },
{ path: "error", component: ErrorComponent },
{ path: "aboutus", component: AboutusComponent },
{ path: "home", component: HomeComponent },
{ path: "course", component: CourseComponent },
{ path: "footer", component: FooterComponent },
{ path: "add-course", component: AddCourseComponent },
{ path: "contact-us", component: ContactUsComponent },
{ path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
