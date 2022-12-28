import ls from 'local-storage';

const indexKey = 'applicant.questionnaire.index';
const key = 'applicant.questionnaire';

/**
 * @returns {Questionnaire[]}
 */
function getAll() {
  return getIndex()
    .map(key => getById(key));
}

/**
 * @returns {string[]}
 */
function getIndex() {
  return ls(indexKey) ?? [];
}

/**
 * 
 * @param {string} id
 * @returns {Questionnaire} 
 */
function getById(id) {
  return ls(`${key}.${id}`);
}

/**
 * @returns {Questionnaire[]}
 */
function getActive() {
  return getAll().filter((q) => !q.isCompleted);
}

/**
 * @returns {Questionnaire[]}
 */
function getCompleted() {
  return getAll().filter((q) => q.isCompleted);
}

/**
 * 
 * @param {Questionnaire} questionnaire
 * @returns {Questionnaire} 
 */
function addOrUpdate(questionnaire) {
  ls(`${key}.${questionnaire.id}`, questionnaire);
  const index = getIndex();
  if (!index.some((i) => i === questionnaire.id)) {
    index.push(questionnaire.id);
    ls(indexKey, index);
  }
  return questionnaire;
}

const api = {
  getAll: getAll,
  getById: getById,
  getActive: getActive,
  getCompleted: getCompleted,
  addOrUpdate: addOrUpdate,
};

export default api;
