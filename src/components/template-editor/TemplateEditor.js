import TemplateQuestion from './TemplateQuestion';
import Template from '../../models/template';
import { useState } from 'react';
import Icon from '../shared/Icon';

/**
 * Template editor component
 * @param {object} template Template repository.
 * @param {function} onChange onChange(template: object) callback function called when template changes.
 */
export default function TemplateEditor({ template, onChange }) {
  if (!template) throw new Error('Template must be given.');
  if (!onChange) throw new Error('onChange callback must be given.');

  const [newQuestion, setNewQuestion] = useState('');

  const addQuestion = () => {
    const text = newQuestion;
    const modifiedTemplate = Template.addQuestion(text, template);
    onChange(modifiedTemplate);
    setNewQuestion('');
  };
  const updateQuestion = (id, modifiedText) => {
    const modifiedTemplate = Template.changeQuestionText(
      id,
      modifiedText,
      template
    );
    onChange(modifiedTemplate);
  };
  const removeQuestion = (id) => {
    const modifiedTemplate = Template.removeQuestion(id, template);
    onChange(modifiedTemplate);
  };
  const reorderQuestion = (id, newIndex) => {
    const modifiedTemplate = Template.reorderQuestion(id, newIndex, template);
    onChange(modifiedTemplate);
  };
  const onDragStart = (event, draggedId) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('text/plain', draggedId);
  };
  const onDrop = (event, droppedIndex) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    reorderQuestion(draggedId, droppedIndex);
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
        draggable='true'>
        <TemplateQuestion
          question={question.text}
          onChange={(modifiedText) => updateQuestion(question.id, modifiedText)}
          onClick={() => removeQuestion(question.id)}
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
        onChange={setNewQuestion}
        onClick={addQuestion}
        className='new-template-question'
        placeholder='Enter new question...'>
        <Icon icon='plus-lg' />
      </TemplateQuestion>
      {questions}
    </div>
  );
}
