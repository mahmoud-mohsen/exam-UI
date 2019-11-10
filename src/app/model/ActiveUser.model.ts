import { Course } from './Course.model';
export enum type { TEACHER, STUDENT, ADMIN }
export enum level { A1, A2, A3, A4, A5, A6, B1, B2, B3, C1, C2, C3 }
export class ActiveUser {
  id: Number;
  displayName:string;
  level: level;
  email: String;
  type: type;
  age: Number;
  image: String;
  phone:String;
  constructor() {
    this.id = null;
    this.type = null;
    this.level = null;
    this.email = '';
    this.image = '';
    this.phone='';
    this.displayName='';
  }
}