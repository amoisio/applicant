import Button from '../shared/Button';

/**
 * Template question component for editing and signaling the desire to remove a question from a template.
 * @param {string} question Question text
 * @param {function} onChange onChange(modifiedText: string) callback called when question text changes.
 * @param {function} onRemove onRemove() callback called when user clicks on the 'Remove' button.
 */
export default function TemplateQuestion(props) {
  if (!props.onChange) {
    throw new Error('onChange callback not defined.');
  }
  const onChange = props.onChange;

  if (!props.onRemove) {
    throw new Error('onRemove callback not defined.');
  }
  const onRemove = props.onRemove;
  const question = props.question;
  return (
    <div className='template-question'>
      <input
        type='text'
        onChange={(e) => onChange(e.target.value)}
        value={question}
      />
      <Button onClick={onRemove}>Remove</Button>
    </div>
  );
}
