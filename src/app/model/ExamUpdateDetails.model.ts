import { Course } from './Course.model';
export enum level { A1, A2, A3, A4, A5, A6, B1, B2, B3, C1, C2, C3 }
export class ExamUpdateDetails {
  title:String;
  note: String;
  code: String;
  fromDate:Number;
  toDate:Number;
  examTime:Number;
  constructor() {
    this.fromDate = null;
    this.toDate = null;
    this.examTime = null;
    this.code = '';
    this.note = '';
    this.title = '';
  }
}