import { Course } from './Course.model';
export enum type { TEACHER, STUDENT, ADMIN }
export enum level { A1, A2, A3, A4, A5, A6, B1, B2, B3, C1, C2, C3 }
export class User {
  id: Number;
  firstName: String;
  lastName: String;
  level: level;
  email: String;
  password: String;
  type: type;
  age: Number;
  image: String;
  rate: Number;
  sammury: String;
  createdCourses: Course[];
  teacherTitle: String;
  numberOfActivestudents:Number;
  enrollCourse:Course[];
  phone:String;
  constructor() {
    this.id = null;
    this.firstName = '';
    this.type = null;
    this.lastName = '';
    this.level = null;
    this.email = '';
    this.password = '';
    this.image = '';
    this.rate = null;
    this.teacherTitle = '';
    this.numberOfActivestudents=0;
    this.enrollCourse=new Array();
    this.createdCourses=new Array();
    this.sammury='';
    this.phone='';
  }
}