export enum type { TEACHER, STUDENT, ADMIN }
export enum level { A1, A2, A3, A4, A5, A6, B1, B2, B3, C1, C2, C3 }
export class SignUpRequest {
  firstName: String;
  middleName: String;
  lastName: String;
  email: String;
  password: String;
  age: Number;
  phone: String;
  studentLevel: level;
  type: type;
  image: any;
  constructor() {
    this.firstName = '';
    this.middleName = '';
    this.type = null;
    this.lastName = '';
    this.studentLevel = null;
    this.email = '';
    this.password = '';
  }
}