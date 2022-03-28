import Question from './question';

/**
 * Creates a new immutable template.
 * @param {string} id 
 * @param {Array} questions 
 * @returns 
 */
function factory(id, questions) {
  let qs;
  if (Array.isArray(questions)) {
    qs = questions.map(q => Question.create(q.id, q.text));
  } else if (typeof(questions) === 'object') {
    qs = [Question.create(questions.id, questions.text)];
  } else {
    qs = [];
  }
  return {
    id,
    questions: qs
  };
}

/**
 * Returns a new immutable template with the added question.
 * @param {object} question Question to add.
 * @param {object} template Template.
 * @returns An immutable template with the added question.
 */
function addQuestion(question, template) {
  const updatedQuestions = [...template.questions, question];
  return factory(template.id, updatedQuestions);
}

/**
 * Returns a new immutable template with the question removed.
 * @param {object} question Question to remove.
 * @param {object} template Template.
 * @returns An immutable template without the removed question.
 */
function removeQuestion(question, template) {
  const updatedQuestions = [...template.questions];
  const index = updatedQuestions.findIndex(q => q.id === question.id);
  if (index === -1) {
    return template;
  }
  updatedQuestions.splice(index, 1);
  return factory(template.id, updatedQuestions);
}

/**
 * Returns a new immutable template with the question updated.
 * @param {object} question Question to update.
 * @param {object} template Template.
 * @returns An immutable template with the question updated.
 */
function updateQuestion(question, template) {
  const updatedQuestions = [...template.questions];
  const index = updatedQuestions.questions.findIndex(q => q.id === question.id);
  if (index === -1) {
    return template;
  }
  updatedQuestions[i] = Question.changeText(question.text, updateQuestion[i]);
  return factory(template.id, updatedQuestions);
}

const template = {
  create: factory,
  addQuestion: addQuestion,
  updateQuestion: updateQuestion,
  removeQuestion: removeQuestion
};

export default template;