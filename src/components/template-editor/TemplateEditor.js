import ViewTitle from '../shared/ViewTitle';
import TemplateQuestion from './TemplateQuestion';
import NewTemplateQuestion from './NewTemplateQuestion';

// TODO: Add reordering capability
/**
 * Template editor component
 * @param {object} templateRepository Template repository.
 */
export default function TemplateEditor(props) {
  
  const template = props.template;
  if (!template) {
    throw new Error('Template must be given.');
  }

  const onAdd = props.onAdd;
  if (!onAdd) {
    throw new Error('onAdd callback not defined.');
  }

  const onChange = props.onChange;
  if (!onChange) {
    throw new Error('onChange callback not defined.');
  }

  const onRemove = props.onRemove;
  if (!onRemove) {
    throw new Error('onRemove callback not defined.');
  }

  const questions = template.questions.map((question) => {
    return (
      <TemplateQuestion
        key={question.id}
        question={question.text}
        onChange={(modifiedText) =>
          onChange(question.id, modifiedText)
        }
        onRemove={() => onRemove(question.id)}
      />
    );
  });

  return (
    <div id='template-editor'>
      <ViewTitle>Template</ViewTitle>
      {questions}
      <NewTemplateQuestion onAdd={onAdd} />
    </div>
  );
}
