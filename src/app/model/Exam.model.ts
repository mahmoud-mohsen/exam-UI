import { EnrollCourse } from './enrollCourse.model';
export enum type { TEACHER, STUDENT, ADMIN }

export class Exam {
  id: Number;

  code: string;

  title: string;

  note: string;

  creationTime: Number;

  fromDate: Number;

  toDate: Number;

  examTime: Number;

  published: boolean;

  enrollCourseRequest: EnrollCourse;
  constructor() {
    this.id = null;
    this.code = '';
    this.title = '';
    this.fromDate = null;
    this.toDate = null;
    this.creationTime = null;
    this.examTime = null;
    this.enrollCourseRequest = new EnrollCourse();
    this.published = false;
  }
}