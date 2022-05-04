// @flow

import { v4 as uuid } from 'uuid';
import { trimmedOrDefault } from './common';

/**
 * Question type.
 */
export type Question = {|
  id: string,
  text: string,
  answer: ?string,
  isAnswered: boolean,
|};

/**
 * Create a question.
 * @param {string} text Question text.
 * @param {string} id Question id.
 * @param {string} answer Answer text.
 * @returns An immutable question.
 */
function create(text: ?string, id: string, answer: ?string): Question {
  const trimmedText = trimmedOrDefault(text);
  if (!trimmedText) {
    throw new Error('Question text must be given.');
  }
  const trimmedId = trimmedOrDefault(id);
  const trimmedAnswer = trimmedOrDefault(answer);
  return {
    id: trimmedId ?? uuid(),
    text: trimmedText,
    answer: answer,
    isAnswered: !!trimmedAnswer,
  };
}

/**
 * Returns a new immutable question structure with an updated question.
 * @param {string} answer Answer text.
 * @param {object} question Question structure.
 * @returns An immutable question with the answer text.
 */
function answer(answer: ?string, question: Question): Question {
  if (!question) {
    throw new Error('Question object must be given.');
  }
  return create(question.text, question.id, answer);
}

const api = {
  create: create,
  answer: answer,
};

export default api;
