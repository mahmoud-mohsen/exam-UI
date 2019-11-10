export class EnrollCourse {
  id: Number;
  courseId: Number;
  courseName: string;
  userId: Number;
  userName: string;
  status: string;
  creationTime: Number;
  constructor() {
    this.courseId = null;
    this.id = null;
    this.userId = null;
    this.status = '';
    this.userName = '';
    this.courseName = '';
    this.creationTime = null;
  }
}