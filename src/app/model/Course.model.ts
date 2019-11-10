import { level } from './user.model';
export enum type { TEACHER, STUDENT, ADMIN }

class EnrollCourseRequest {
  status:string;
  constructor() {
    this.status='';
  }
}
export class Course {
  id: Number;

  code: String;

  title: String;

  level: level;

  creationTime: Number;

  createdBy:Number;

  enrollCourseRequest;EnrollCourseRequest;
  constructor() {
    this.id = null;
    this.code = '';
    this.title = null;
    this.level = null;
    this.creationTime = null;
    this.createdBy=null;
    this.enrollCourseRequest=new EnrollCourseRequest();

  }
}