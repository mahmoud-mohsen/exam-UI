
export class MCQuestion {
  id:Number;

  question:String;
  answer1:String;
  answer2:String;
  answer3:String;
  answer4:String;
  correct:string;

  size:Number;

  constructor() {
    this.id = null;
    this.question = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.correct = '';
    this.size=0;
  }
}