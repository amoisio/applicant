import ls from 'local-storage';

const key = 'applicant.template'; 

/**
 * Retrieves the questionnaire template.
 * @returns {Template} Template stored in the repository.
 */
function getTemplate() {
  return ls(key);
}

/**
 * Checks if the repository has a template.
 * @returns {Boolean} True or false depending on whether the repository contains
 * a template.
 */
function hasTemplate() {
  const template = getTemplate();
  return !!template;
}

/**
 * Adds a template or updates the existing template stored in the repository.
 * @param {Template} template Template to be stored in the repository.
 * @returns {Template} A reference to the template that was saved in the repository.
 */
function addOrUpdateTemplate(template) {
  ls(key, template);
  return template;
}

const api = {
  getTemplate: getTemplate,
  hasTemplate: hasTemplate,
  addOrUpdateTemplate: addOrUpdateTemplate,
};

export default api;
