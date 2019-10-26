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
  path:'' ,
  component:HomeComponent,
  canActivate: [ Active ]
}
,{
  path:'signUp',
  component:RegisterStudent
},{
  path:'newUser',
  component:CreateUser,
  canActivate: [ Active ]
},{
  path:'users',
  component:ViewUsersComponent,
  canActivate: [ Active ]
},{
  path:'userProfile/:id',
  component:ViewUserProfileComponent,
  canActivate: [ Active ]
},{
  path:'teacher/:id/courses',
  component:ViewCoursesComponent,
  pathMatch: 'full',
  canActivate: [ Active ]
},{
  path:'newCourse',
  component:CreateCourseComponent,
  canActivate: [ Active ]
},{
  path:'login',
  component:LoginComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
