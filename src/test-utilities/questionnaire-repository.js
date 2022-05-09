
const store = new Map();

function getAll() {
  return getIndex()
    .map(key => getById(key));
}

function getIndex() {
  const indices = [];
  for(const key of store.keys()) {
    if (key !== undefined || key !== null) {
      indices.push(key.toString());
    }
  }
  return indices;
}

function getById(id) {
  return store[id];
}

function getActive() {
  return getAll()
    .filter((q) => !q.isCompleted);
}

function getCompleted() {
  return getAll()
    .filter((q) => q.isCompleted);
}

function addOrUpdate(questionnaire) {
  store.set(questionnaire.id, questionnaire);
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
