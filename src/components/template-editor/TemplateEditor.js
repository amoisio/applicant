import TemplateQuestion from './TemplateQuestion';
import { useState } from 'react';
import Icon from '../shared/Icon';

/**
 * Template editor component
 * @param {object} template Template repository.
 * @param {function} onAdd onAdd(text: string) callback function called when adding a new question.
 * @param {function} onChange onChange(id: string, modifiedText: string) callback function called when changing question text.
 * @param {function} onRemove onRemove(id: string) callback function called when removing a question.
 * @param {function} onReorder onReorder(draggedId: string, droppedId: string) callback function called when dragging and dropping questions around.
 */
export default function TemplateEditor({ template, onAdd, onChange, onRemove, onReorder }) {
  const [newQuestion, setNewQuestion] = useState('');

  if (!template)  throw new Error('Template must be given.');
  if (!onAdd)     throw new Error('onAdd callback not defined.');
  if (!onChange)  throw new Error('onChange callback not defined.');
  if (!onRemove)  throw new Error('onRemove callback not defined.');
  if (!onReorder) throw new Error('onReorder callback not defined.');

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
  const handleAdd = () => {
    const text = newQuestion;
    setNewQuestion('');
    onAdd(text);
  }

  const questions = template.questions.map((question, index) => {
    return (
      <div
        key={question.id}
        onDragStart={(e) => onDragStart(e, question.id)}
        onDrop={(e) => onDrop(e, index)}
        onDragOver={onDragOver}
        draggable='true'>
        <TemplateQuestion
          question={question.text}
          onChange={(modifiedText) => onChange(question.id, modifiedText)}
          onClick={() => onRemove(question.id)}
          placeholder='Enter question...'>
          <Icon icon='x-lg' />
        </TemplateQuestion>
      </div>
    );
  });

  return (
    <div className='template-editor'>
      <TemplateQuestion
        question={newQuestion}
        onChange={(modifiedText) => setNewQuestion(modifiedText)}
        onClick={handleAdd}
        className='new-template-question'
        placeholder='Enter new question...'>
        <Icon icon='plus-lg' />
      </TemplateQuestion>
      {questions}
    </div>
  );
}
