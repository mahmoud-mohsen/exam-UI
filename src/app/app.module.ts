import { CounterComponent } from './component/question/counter/counter.component';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { Active } from './active';
import { CreateUser } from './component/user/add-user/createUser.component';
import { RegisterStudent } from './component/authentication/register-student/registerStudent.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './component/layout/layout.component';
import { HomeComponent } from './component/home/home.component';
import { ViewUsersComponent } from './component/user/view-users/view-users.component';
import { ViewUserProfileComponent } from './component/user/view-user-profile/view-user-profile.component';
import { ViewCoursesComponent } from './component/course/view-courses/view-courses.component';
import { CreateCourseComponent } from './component/course/create-course/create-course.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ViewExamsComponent } from './component/exam/view-exams/view-exams.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NewExamComponent } from './component/exam/new-exam/new-exam.component';
import { ViewQuestionsComponent } from './component/question/view-questions/view-questions.component';
import { ViewEnrollRequestsComponent } from './component/course/view-enroll-requests/view-enroll-requests.component';
import { ViewExamSolversComponent } from './component/exam/view-exam-solvers/view-exam-solvers.component';
import { ViewSolverAnswersComponent } from './component/exam/view-solver-answers/view-solver-answers.component';
import { UpdateCourseComponent } from './component/course/update-course/update-course.component';
import {MatButtonModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { UpdateExamComponent } from './component/exam/update-exam/update-exam.component';

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
    ViewExamsComponent,
    NewExamComponent,
    ViewQuestionsComponent,
    ViewEnrollRequestsComponent,
    ViewExamSolversComponent,
    ViewSolverAnswersComponent,
    CounterComponent,
    UpdateCourseComponent,
    UpdateExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgxPermissionsModule.forRoot(),
    MatMenuModule,
    MatButtonModule,


  ],
  providers: [GlobalBackEndService, Active,CounterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
