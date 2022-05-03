// @flow

import type { Questionnaire } from '../models/questionnaire';

import ls from 'local-storage';

const indexKey = 'applicant.questionnaire.index';
const key = 'applicant.questionnaire';

function getAll(): Questionnaire[] {
  return getIndex()
    .map(key => getById(key));
}

function getIndex(): string[] {
  return ls(indexKey) ?? [];
}

function getById(id: string): Questionnaire {
  return ls(`${key}.${id}`);
}

function getActive(): Questionnaire[] {
  return getAll().filter((q) => !q.isCompleted);
}

function getCompleted(): Questionnaire[] {
  return getAll().filter((q) => q.isCompleted);
}

function addOrUpdate(questionnaire: Questionnaire): Questionnaire {
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
