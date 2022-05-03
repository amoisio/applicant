// @flow

import ls from 'local-storage';
import type { Template } from '../models/template';

const key = 'applicant.template'; 

function getTemplate(): Template {
  return ls(key);
}

function hasTemplate(): boolean {
  const template = getTemplate();
  return !!template;
}

function addOrUpdateTemplate(template: Template): Template {
  ls(key, template);
  return template;
}

const api = {
  getTemplate: getTemplate,
  hasTemplate: hasTemplate,
  addOrUpdateTemplate: addOrUpdateTemplate,
};

export default api;
