import { v4 as uuid } from 'uuid';
import { trimmedOrDefault } from './common';

/**
 * Create a question.
 * @param {string} text Question text.
 * @param {string} id Question id.
 * @param {string} answer Answer text.
 * @returns {Question} A new question.
 */
function create(text, id, answer) {
  const trimmedText = trimmedOrDefault(text);
  if (!trimmedText) {
    throw new Error('Question text must be given.');
  }
  const trimmedId = trimmedOrDefault(id);
  const trimmedAnswer = trimmedOrDefault(answer);
  return {
    id: trimmedId ?? uuid(),
    text: trimmedText,
    answer: trimmedAnswer,
    isAnswered: !!trimmedAnswer,
  };
}

/**
 * Answer a question.
 * @param {string} answer Answer text.
 * @param {Question} question Question to answer.
 * @returns {Question} A new question with the answer text.
 */
function answer(answer, question) {
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
