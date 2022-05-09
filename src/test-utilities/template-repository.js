
const store = [];

function getTemplate() {
  return store[0];
}

function hasTemplate() {
  const template = getTemplate();
  return !!template;
}

function addOrUpdateTemplate(template) {
  store[0] = template;
  return template;
}

const api = {
  getTemplate: getTemplate,
  hasTemplate: hasTemplate,
  addOrUpdateTemplate: addOrUpdateTemplate,
};

export default api;
