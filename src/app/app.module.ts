import { Active } from './active';
import { CreateUser } from './component/user/add-user/createUser.component';
import { RegisterStudent } from './component/authentication/register-student/registerStudent.component';
import { UserService } from './service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutComponent } from './component/layout/layout.component';
import { HomeComponent } from './component/home/home.component';
import { ViewUsersComponent } from './component/user/view-users/view-users.component';
import { ViewUserProfileComponent } from './component/user/view-user-profile/view-user-profile.component';
import { ViewCoursesComponent } from './component/course/view-courses/view-courses.component';
import { CreateCourseComponent } from './component/course/create-course/create-course.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfRqp0pr7VuoS9u2f7McRrhTY99-fwHjw",
  authDomain: "first-85f1c.firebaseapp.com",
  databaseURL: "https://first-85f1c.firebaseio.com",
  projectId: "first-85f1c",
  storageBucket: "first-85f1c.appspot.com",
  messagingSenderId: "1030657022354",
  appId: "1:1030657022354:web:9bd8a4a331beb76ed2494b"
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterStudent,
    LayoutComponent,
    HomeComponent,
    CreateUser,
    ViewUsersComponent,
    ViewUserProfileComponent,
    ViewCoursesComponent,
    CreateCourseComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [UserService,Active],
  bootstrap: [AppComponent]
})
export class AppModule { }
