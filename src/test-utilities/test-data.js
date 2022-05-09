import Template from '../models/template';
import Questionnaire from '../models/questionnaire';

function createTemplate(...questions) {
  let t = Template.create([], 'template-id');
  for(const q of questions) {
    t = Template.addQuestion(q, t);
  }
  return t;
}

function createQuestionnaire(template, title, answers, completed) {
  var q = Questionnaire.create(template, title, title);
  for(let i = 0; i < answers.length; i++) {
    q = Questionnaire.answer(q.questions[i].id, answers[i], q);  
  }
  if (completed) {
    q = Questionnaire.complete(q);
  }
  return q;
}

const api = {
  createTemplate,
  createQuestionnaire
}
export default api;
