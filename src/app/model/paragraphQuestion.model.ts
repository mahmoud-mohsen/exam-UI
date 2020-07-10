import { EssayQuestion } from './EssayQuestion.model';
import { MCQuestion } from './MCQuestion.model';
import { TrueOrFalseQuestion } from './TrueOrFalseQuestion.model';

export class ParagraphQuestion {
  paragraph: String;
  size: Number;
  trueOrFalseQuestion: TrueOrFalseQuestion[];
  essayQuestion: EssayQuestion[];
  mcQuestion: MCQuestion[];

  constructor() {
    this.paragraph = "";
    this.size = 0;
    this.essayQuestion = new Array();
    this.trueOrFalseQuestion = new Array();
    this.mcQuestion = new Array();
  }
}