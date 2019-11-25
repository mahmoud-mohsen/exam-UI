import { Course } from './Course.model';
export enum level { A1, A2, A3, A4, A5, A6, B1, B2, B3, C1, C2, C3 }
export class CourseUpdateDetails {
  title:String;
  level: level;
  code: String;
  constructor() {
    this.level = null;
    this.code = '';
    this.title = '';
  }
}