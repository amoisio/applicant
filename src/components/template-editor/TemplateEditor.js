import ViewTitle from '../shared/ViewTitle';
import TemplateQuestion from './TemplateQuestion';
import NewTemplateQuestion from './NewTemplateQuestion';


/**
 * Template editor component
 * @param {object} template Template repository.
 * @param {function} onAdd onAdd(text: string) callback function called when adding a new question.
 * @param {function} onChange onChange(id: string, modifiedText: string) callback function called when changing question text.
 * @param {function} onRemove onRemove(id: string) callback function called when removing a question.
 * @param {function} onReorder onReorder(draggedId: string, droppedId: string) callback function called when dragging and dropping questions around.
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
  const onReorder = props.onReorder;
  if (!onReorder) {
    throw new Error('onReorder callback not defined.');
  }

  const onDragStart = (event, draggedId) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('text/plain', draggedId);
  };
  const onDrop = (event, droppedIndex) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    onReorder(draggedId, droppedIndex);
  };
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const questions = template.questions.map((question, index) => {
    return (
      <div
        key={question.id}
        onDragStart={(e) => onDragStart(e, question.id)}
        onDrop={(e) => onDrop(e, index)}
        onDragOver={onDragOver}
        draggable='true'
      >
        <TemplateQuestion
          question={question.text}
          onChange={(modifiedText) => onChange(question.id, modifiedText)}
          onRemove={() => onRemove(question.id)}
          orderNumber={index + 1}
        />
      </div>
    );
  });

  return (
    <div id='template-editor'>
      <ViewTitle>Add new question</ViewTitle>
      <NewTemplateQuestion onAdd={onAdd} />
      <ViewTitle>Template questions</ViewTitle>
      <div id='template-questions'>{questions}</div>
    </div>
  );
}
