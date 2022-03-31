import ls from 'local-storage';

const key = 'applicant.template'; 

function get() {
  return ls(key);
}

function addOrUpdate(template) {
  ls(key, template);
  return template;
}

const api = {
  get: get,
  addOrUpdate: addOrUpdate,
};

export default api;
