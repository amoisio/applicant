import ls from 'local-storage';
import Question from '../components/template-editor/Question';

const key = 'applicant.template'; 

// Made a change
function getQuestions() {
  const qs = ls(key);
  if (qs === undefined || qs === null) {
    return [{
      id: 'my-id',
      text: 'Hello, world!'
    }, {
      id: 'another-id',
      text: 'Another hello!'
    }];
  } else {
    return qs;
  }
}

// Made another change
function addQuestion(questionText) {
  if (typeof(questionText) !== "string") {
    throw new Error("questionText must be a string.");
  } 
  const question = new Question(questionText);
  const questions = [...getQuestions()];
  questions.push(question);
  setQuestions(questions);
}

function setQuestions(questionsArray) {
  if (!Array.isArray(questionsArray)) {
    throw new Error("questionsArray must be an array.");
  }
  if (questionsArray.length === 0) {
    ls(key, []);
    return;
  }
  ls(key, questionsArray);
}

export const service = {
  getQuestions,
  setQuestions,
};