import { v4 as uuid } from 'uuid';

export default class Question {
  constructor(question) {
    if (question instanceof Question) {
      this.id = question.id;
      this.text = question.text;
    } else if (question instanceof string) {
      this.id = uuid();
      this.text = question;
    } else {
      throw new Error("Question constructor parameter must be of type Question or string.");
    }
  }
}