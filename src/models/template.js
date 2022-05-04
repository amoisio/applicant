// @flow

import { v4 as uuid } from 'uuid';
import { trimmedOrDefault } from './common';
import TemplateQuestionAPI from './template-question';
import type { TemplateQuestion } from './template-question';

/**
 * Template type.
 */
export type Template = {
  id: string,
  questions: TemplateQuestion[]
};

/**
 * Create a template.
 * @param {any[]|any} questions Template questions to include in the template.
 * @param {string} id Template id. A UUID value will be auto generated if id is not provided.
 * @returns
 */
function create(questions: TemplateQuestion[], id: string): Template {
  let arr = [];
  if (Array.isArray(questions)) {
    arr = questions.map(q => TemplateQuestionAPI.create(q.text, q.id));
  } else if (typeof questions === 'object') {
    arr = [TemplateQuestionAPI.create(questions.text, questions.id)];
  } else {
    arr = [];
  }
  const trimmedId = trimmedOrDefault(id);
  return {
    id: trimmedId ?? uuid(),
    questions: arr,
  };
}

/**
 * Add a question to the template.
 * @param {string} text Question text.
 * @param {object} template Template to which the question is added.
 * @returns A copy of the template with the added question.
 */
function addQuestion(text: string, template: Template): Template {
  const trimmedText = trimmedOrDefault(text);
  if (!trimmedText) {
    throw new Error('Question text must be given.');
  }
  const updatedQuestions = [...template.questions, TemplateQuestionAPI.create(trimmedText)];
  return create(updatedQuestions, template.id);
}

/**
 * Remove a question from the template.
 * @param {string} id Id of the question to remove.
 * @param {object} template Template from which the question is removed.
 * @returns A copy of the template without the removed question.
 */
function removeQuestion(id: string, template: Template): Template {
  const updatedQuestions = [...template.questions];
  const index = updatedQuestions.findIndex((q) => q.id === id);
  if (index === -1) {
    throw new Error(`Unable to find question ${id}.`);
  }
  updatedQuestions.splice(index, 1);
  return create(updatedQuestions, template.id);
}

/**
 * Move a question to different location within the template.
 * @param {string} id Id of the question to move.
 * @param {number} newIndex New index of the question. Value 0/-1 or any index >= size of the array places the question at the top/end of the list of questions, respectively.
 * @param {object} template Template in which the question is moved
 * @returns A copy of the template in which the question is in the new location.
 */
function reorderQuestion(id: string, newIndex: number, template: Template): Template {
  if (newIndex === null || newIndex === undefined) {
    throw new Error('New index must be given.');
  }

  const updatedQuestions = [...template.questions];
  const currentIndex = updatedQuestions.findIndex(q => q.id === id);
  if (currentIndex === -1) {
    throw new Error(`Unable to find question ${id}.`);
  }
  if (newIndex === currentIndex) {
    return template;
  }
  const currentQuestion = updatedQuestions.splice(currentIndex, 1)[0];
  if (newIndex === 0) {
    updatedQuestions.splice(0, 0, currentQuestion);
  } else if (newIndex === -1 || newIndex >= updatedQuestions.length) {
    updatedQuestions.push(currentQuestion);
  } else {
    updatedQuestions.splice(newIndex, 0, currentQuestion);
  }
  return create(updatedQuestions, template.id);
}

/**
 * Change a question's text.
 * @param {string} id Id of the question with the updated text.
 * @param {string} text Updated question text.
 * @param {object} template Template in which the question text will be changed.
 * @returns A copy of the template in which the question text is changed.
 */
function changeQuestionText(id: string, text: ?string, template: Template): Template {
  const updatedQuestions = [...template.questions];
  const index = updatedQuestions.findIndex(q => q.id === id);
  if (index === -1) {
    throw new Error(`Unable to find question ${id}.`);
  }
  updatedQuestions[index] = TemplateQuestionAPI.changeText(
    text,
    updatedQuestions[index]
  );
  return create(updatedQuestions, template.id);
}

const api = {
  create: create,
  addQuestion: addQuestion,
  changeQuestionText: changeQuestionText,
  removeQuestion: removeQuestion,
  reorderQuestion: reorderQuestion,
};

export default api;
