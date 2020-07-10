export class StudentExamHistory {
  examId: Number;
  examName: string;
  courseName: String;
  examTotalPoints: any;
  point: any;
  solvedDate: any;
  constructor() {
    this.examTotalPoints = null;
    this.point = null;
    this.solvedDate = null;
    this.courseName = '';
    this.examName = '';
    this.examId = null;
  }
}