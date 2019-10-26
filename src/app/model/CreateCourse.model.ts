import { level } from './user.model';
export enum type { TEACHER, STUDENT, ADMIN }
export class CourseCourse {

  code: String;

  title: String;

  level: level;

  constructor() {
    this.code = '';
    this.title = null;
    this.level = null;

  }
}