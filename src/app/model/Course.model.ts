import { level } from './user.model';
export enum type { TEACHER, STUDENT, ADMIN }
export class Course {
  id: Number;

  code: String;

  title: String;

  level: level;

  creationTime: Number;
  constructor() {
    this.id = null;
    this.code = '';
    this.title = null;
    this.level = null;
    this.creationTime = null;

  }
}