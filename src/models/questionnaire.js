import { v4 as uuid } from 'uuid';
import { trimmedOrDefault } from './common';
import QuestionAPI from './question';

/**
 * Create a questionnaire.
 * @param {Template} template Template used to populate the questionnaire.
 * @param {string} title Questionnaire title.
 * @param {string} id Questionnaire id.
 * @returns {Questionnaire} A new questionnaire.
 */
function create(template, title, id) {
  const questions = template.questions.map((q) =>
    QuestionAPI.create(q.text, q.id)
  );
  return createInternal(questions, title, new Date(), null, id);
}

/**
 * 
 * @param {Question[]} questions 
 * @param {string} title 
 * @param {Date} started 
 * @param {Date} finished 
 * @param {string} id 
 * @returns {Questionnaire}
 */
function createInternal(questions, title, started, finished, id) {
  const trimmedTitle = trimmedOrDefault(title);
  if (!trimmedTitle) {
    throw new Error('Title must be given.');
  }
  const trimmedId = trimmedOrDefault(id);
  return {
    id: trimmedId ?? uuid(),
    title: trimmedTitle,
    questions: questions.map((q) => QuestionAPI.create(q.text, q.id, q.answer)),
    started,
    finished,
    isCompleted: !!finished
  };
}

/**
 * Answer a questionnaire question.
 * @param {string} id Id of the question to answer.
 * @param {string} text Answer text.
 * @param {Questionnaire} questionnaire Questionnaire to answer.
 * @returns {Questionnaire} A new questionnaire with the answered question.
 */
function answer(id, text, questionnaire) {
  if (questionnaire.isCompleted) {
    throw new Error(
      'Unable to answer question. Questionnaire has been completed.'
    );
  }

  const updatedQuestions = [...questionnaire.questions];
  const index = updatedQuestions.findIndex((q) => q.id === id);
  updatedQuestions[index] = QuestionAPI.answer(text, updatedQuestions[index]);
  return createInternal(
    updatedQuestions,
    questionnaire.title,
    questionnaire.started,
    questionnaire.finished,
    questionnaire.id
  );
}

/**
 * Complete the questionnaire.
 * @param {Questionnaire} questionnaire Questionnaire to complete
 * @returns {Questionnaire} A new completed questionnaire.
 */
function complete(questionnaire) {
  return createInternal(
    questionnaire.questions,
    questionnaire.title,
    questionnaire.started,
    new Date(),
    questionnaire.id
  );
}

const api = {
  create: create,
  answer: answer,
  complete: complete
};

export default api;
