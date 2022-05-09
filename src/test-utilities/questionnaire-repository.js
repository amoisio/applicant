export default function createRepository() {
  const store = new Map();

  const getIndex = () => {
    const indices = [];
    for(const key of store.keys()) {
      if (key !== undefined || key !== null) {
        indices.push(key.toString());
      }
    }
    return indices;
  }
  
  const getAll = () => {
    return getIndex()
      .map(key => getById(key));
  }

  const getById = (id) => {
    return store.get(id);
  }

  const getActive = () => {
    return getAll()
      .filter((q) => !q.isCompleted);
  }

  const getCompleted = () => {
    return getAll()
      .filter((q) => q.isCompleted);
  }

  const addOrUpdate = (questionnaire) => {
    store.set(questionnaire.id, questionnaire);
    return questionnaire;
  }
  
  return {
    getAll,
    getById,
    getActive,
    getCompleted,
    addOrUpdate
  };
}
