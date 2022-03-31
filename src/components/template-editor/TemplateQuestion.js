import Button from '../shared/Button';

/**
 * Template question component for editing and removing a question from a template
 * @param {string} id Question identifier
 * @param {string} question Question text
 * @param {function} onChange onChange(id: string, modifiedText: string) callback called when question text changes.
 * @param {function} onRemove onRemove(id: string) callback called when user clicks on the 'Remove' button.
 */
export default function TemplateQuestion(props) {
  return (
    <div className='template-question'>
      <input
        type='text'
        onChange={(e) => props.onChange(props.id, e.target.value)}
        value={props.question}
      />
      <Button onClick={() => props.onRemove(props.id)}>Remove</Button>
    </div>
  );
}
