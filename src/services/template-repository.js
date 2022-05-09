// @flow

import ls from 'local-storage';

const key = 'applicant.template'; 

function getTemplate() {
  return ls(key);
}

function hasTemplate() {
  const template = getTemplate();
  return !!template;
}

function addOrUpdateTemplate(template){
  ls(key, template);
  return template;
}

const api = {
  getTemplate: getTemplate,
  hasTemplate: hasTemplate,
  addOrUpdateTemplate: addOrUpdateTemplate,
};

export default api;
