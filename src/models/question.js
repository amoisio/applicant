/**
 * Creates a new immutable question.
 * @param {string} id Question id.
 * @param {string} text Question text.
 * @returns An immutable question.
 */
function factory(id, text) {
  return { id, text };
}

/**
 * Returns a new immutable question structure with an updated question.
 * @param {object} question Question structure.
 * @param {string} text New question text.
 * @returns An immutable question with the question text.
 */
function changeText(text, question) {
  return factory(question.id, text);
}

const question = {
  create: factory,
  changeText: changeText,
};

export default question;
