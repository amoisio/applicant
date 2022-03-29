import ls from 'local-storage';

const key = 'applicant.template'; 

function get() {
  return ls(key);
}

function save(template) {
  ls(key, template);
  return template;
}

const api = {
  get: get,
  save: save
}

export default api;
