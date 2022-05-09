export default function createRepository() {
  const store = [];
  const getTemplate = () => store[0];
  const hasTemplate = () => !!getTemplate();
  const addOrUpdateTemplate = (template) => {
    store[0] = template;
    return template;
  }
  return {
    getTemplate,
    hasTemplate,
    addOrUpdateTemplate
  };
}
