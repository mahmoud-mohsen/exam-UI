import { ViewSolverAnswersComponent } from './component/exam/view-solver-answers/view-solver-answers.component';
import { ViewEnrollRequestsComponent } from './component/course/view-enroll-requests/view-enroll-requests.component';
import { ViewQuestionsComponent } from './component/question/view-questions/view-questions.component';
import { NewExamComponent } from './component/exam/new-exam/new-exam.component';
import { ViewExamsComponent } from './component/exam/view-exams/view-exams.component';
import { Active } from './active';
import { LoginComponent } from './component/authentication/login/login.component';
import { CreateCourseComponent } from './component/course/create-course/create-course.component';
import { ViewCoursesComponent } from './component/course/view-courses/view-courses.component';
import { ViewUserProfileComponent } from './component/user/view-user-profile/view-user-profile.component';
import { ViewUsersComponent } from './component/user/view-users/view-users.component';
import { CreateUser } from './component/user/add-user/createUser.component';
import { RegisterStudent } from './component/authentication/register-student/registerStudent.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [Active],
  data: { expectedType: ['ADMIN', 'TEACHER', 'STUDENT'] }
}
  , {
  path: 'signUp',
  component: RegisterStudent
}, {
  path: 'newUser',
  component: CreateUser,
  canActivate: [Active],
  data: { expectedType: ['ADMIN'] }
}, {
  path: 'users',
  component: ViewUsersComponent,
  canActivate: [Active],
  data: { expectedType: ['ADMIN', 'TEACHER', 'STUDENT'] }

}, {
  path: 'userProfile/:id',
  component: ViewUserProfileComponent,
  canActivate: [Active],
  data: { expectedType: ['ADMIN', 'TEACHER', 'STUDENT'] }

}, {
  path: 'user/:id/courses',
  component: ViewCoursesComponent,
  pathMatch: 'full',
  canActivate: [Active],
  data: { expectedType: ['ADMIN', 'TEACHER', 'STUDENT'] }
}, {
  path: 'course/:id/exams',
  component: ViewExamsComponent,
  pathMatch: 'full',
  canActivate: [Active],
  data: { expectedType: ['ADMIN', 'TEACHER', 'STUDENT'] }

}, {
  path: 'exam/:id/questions',
  component: ViewQuestionsComponent,
  pathMatch: 'full',
  canActivate: [Active],
  data: { expectedType: ['ADMIN', 'TEACHER', 'STUDENT'] }

}, {
  path: 'exam/:examId/solver/:solverId',
  component: ViewSolverAnswersComponent,
  pathMatch: 'full',
  canActivate: [Active],
  data: { expectedType: ['TEACHER', 'STUDENT'] }

}, {
  path: 'newCourse',
  component: CreateCourseComponent,
  canActivate: [Active],
  data: { expectedType: ['TEACHER'] }

}, {
  path: 'enrollRequests',
  component: ViewEnrollRequestsComponent,
  canActivate: [Active],
  data: { expectedType: ['TEACHER'] }

}, {
  path: 'login',
  component: LoginComponent,
}, {
  path: 'course/:id/newExam',
  component: NewExamComponent,
  pathMatch: 'full',
  canActivate: [Active],
  data: { expectedType: ['TEACHER'] }
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
