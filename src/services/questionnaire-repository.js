import ls from 'local-storage';

const indexKey = 'applicant.questionnaire.index';
const key = 'applicant.questionnaire';

function getAll() {
  return getIndex()
    .map(key => getById(key));
}

function getIndex() {
  return ls(indexKey) ?? [];
}

function getById(id) {
  return ls(`${key}.${id}`);
}

function save(questionnaire) {
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
  save: save,
};

export default api;
