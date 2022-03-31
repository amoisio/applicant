import { v4 as uuid } from 'uuid';
import { trimmedOrDefault } from './common'

/**
 * Create a template question.
 * @param {string} text Question text.
 * @param {string} id Question id. A UUID value will be auto generated if id is not provided.
 * @returns A template question.
 */
function create(text, id) {
  const trimmedId = trimmedOrDefault(id);
  return {
    id: trimmedId ?? uuid(),
    text: text,
  };
}

/**
 * Change template question text.
 * @param {string} text New question text.
 * @param {object} question Question to change.
 * @returns A template question with the changed text.
 */
function changeText(text, question) {
  if (!question) {
    throw new Error('Question object must be given.');
  }
  return create(text, question.id);
}

const api = {
  create: create,
  changeText: changeText,
};

export default api;
