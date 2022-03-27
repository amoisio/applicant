import { v4 as uuid } from 'uuid';
import Question from './question';

export default class Template {
  constructor() {
    this.id = uuid();
    this.questions = [];
  }

  addQuestion(question) {
    const added = new Question(question);
    this.questions.push(added);
  }

  removeQuestion(question) {
    const index = this.questions.findIndex(q => q.id === question.id);
    if (index === -1) {
      return undefined;
    }
    const removed = this.questions.splice(index, 1);
    return removed[0];
  }
}
