// @flow

import { v4 as uuid } from 'uuid';
import { trimmedOrDefault } from './common';
import QuestionAPI from './question';
import type { Question } from './question';
import type { Template } from './template';

/**
 * Questionnaire type.
 */
export type Questionnaire = {|
  id: string,
  title: string,
  questions: Question[],
  started: Date,
  finished: ?Date,
  isCompleted: boolean
|};

/**
 * Create a questionnaire.
 * @param {object} template Template used to populate the questionnaire.
 * @param {string} title Questionnaire title.
 * @param {string} id Questionnaire id.
 * @returns An immutable questionnaire.
 */
function create(template: Template, title: string, id: string): Questionnaire {
  const questions = template.questions.map((q) =>
    QuestionAPI.create(q.text, q.id)
  );
  return createInternal(questions, title, new Date(), null, id);
}

function createInternal(questions: Question[], title: string, started: Date, finished: ?Date, id: ?string): Questionnaire {
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
 * Answer a question.
 * @param {string} id Id of the question to answer.
 * @param {string} text Answer text.
 * @param {object} questionnaire Questionnaire to answer.
 * @returns A copy of the questionnaire with the answered question.
 */
function answer(id: string, text: ?string, questionnaire: Questionnaire): Questionnaire {
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
 * @param {object} questionnaire Questionnaire to complete
 * @returns A copy of the completed questionnaire.
 */
function complete(questionnaire: Questionnaire): Questionnaire {
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
