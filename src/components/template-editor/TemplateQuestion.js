import Button from '../shared/Button';
import Icon from '../shared/Icon';
import AutoGrowTextarea from '../shared/AutoGrowTextarea';
/**
 * Template question component for editing and signaling the desire to remove a question from a template.
 * @param {string} question Question text
 * @param {function} onChange onChange(modifiedText: string) callback called when question text changes.
 * @param {function} onRemove onRemove() callback called when user clicks on the 'Remove' button.
//  * @param {function} onReorder onReorder(e) callback called when TemplateQuestion is being dragged
 */
export default function TemplateQuestion(props) {
  const question = props.question;
  const onChange = props.onChange;
  if (!onChange) {
    throw new Error('onChange callback not defined.');
  }
  const onRemove = props.onRemove;
  if (!onRemove) {
    throw new Error('onRemove callback not defined.');
  }

  return (
    <div className='template-question'>
      <Icon icon='grip-vertical' className='drag-button'/>
      <AutoGrowTextarea
        placeholder='Enter question text...'
        onChange={onChange}
        value={question}
      />
      <Button onClick={onRemove} className='action-button'>
        <Icon icon='x-lg' />
      </Button>
    </div>
  );
}
