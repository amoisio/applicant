import Question from './question';

/**
 * Creates a new template.
 * @param {string} id
 * @param {Array} questions
 * @returns
 */
function factory(id, questions) {
  let qs;
  if (Array.isArray(questions)) {
    qs = questions.map((q) => Question.create(q.id, q.text));
  } else if (typeof questions === 'object') {
    qs = [Question.create(questions.id, questions.text)];
  } else {
    qs = [];
  }
  return {
    id,
    questions: qs,
  };
}

/**
 * Add a question to the template.
 * @param {object} question Question to add.
 * @param {object} template Template to which the question is added.
 * @returns A copy of the template with the added question.
 */
function addQuestion(question, template) {
  const updatedQuestions = [...template.questions, question];
  return factory(template.id, updatedQuestions);
}

/**
 * Remove a question from the template.
 * @param {object} question Question to remove.
 * @param {object} template Template from which the question is removed.
 * @returns A copy of the template without the removed question.
 */
function removeQuestion(question, template) {
  const updatedQuestions = [...template.questions];
  const index = updatedQuestions.findIndex(q => q.id === question.id);
  if (index === -1) {
    console.error(
      `Unable to find question ${question.text} for removal. No action taken.`
    );
    return template;
  }
  updatedQuestions.splice(index, 1);
  return factory(template.id, updatedQuestions);
}

/**
 * Move a question to different location within the template.
 * @param {object} question Question to move.
 * @param {number} newIndex New index of the question. Value 0/-1 or any index >= size of the array places the question at the top/end of the list of questions, respectively.
 * @param {object} template Template in which the question is moved
 * @returns A copy of the template in which the question is in the new location.
 */
function reorderQuestion(question, newIndex, template) {
  const updatedQuestions = [...template.questions];
  const currentIndex = updatedQuestions.findIndex(q => q.id === question.id);
  if (currentIndex === -1) {
    console.error(
      `Unable to find question ${question.text} for reordering. No action taken.`
    );
    return template;
  }
  if (newIndex === currentIndex) {
    return template;
  }
  updatedQuestions.splice(currentIndex, 1);
  if (newIndex === 0) {
    updatedQuestions.splice(0, 0, question); 
  } else if (newIndex === -1 || newIndex >= updatedQuestions.length) {
    updatedQuestions.push(question);
  } else {
    updatedQuestions.splice(newIndex, 0, question);
  }
  return factory(template.id, updatedQuestions);
}

/**
 * Change a question's text.
 * @param {object} question Question with the updated text.
 * @param {object} template Template in which the question text will be changed.
 * @returns A copy of the template in which the question text is changed.
 */
function changeQuestionText(question, template) {
  const updatedQuestions = [...template.questions];
  const index = updatedQuestions.findIndex(q => q.id === question.id);
  if (index === -1) {
    console.error(
      `Unable to find question ${question.text} to update. No action taken.`
    );
    return template;
  }
  updatedQuestions[index] = Question.changeText(question.text, updatedQuestions[index]);
  return factory(template.id, updatedQuestions);
}

const template = {
  create: factory,
  addQuestion: addQuestion,
  changeQuestionText: changeQuestionText,
  removeQuestion: removeQuestion,
  reorderQuestion: reorderQuestion
};

export default template;
