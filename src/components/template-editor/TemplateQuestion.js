import Button from '../shared/Button';
import AutoGrowTextarea from '../shared/AutoGrowTextarea';
/**
 * Template question component for editing a question and signaling an action for a template.
 * @param {string} question Question text.
 * @param {function} onChange onChange(modifiedText: string) callback called when question text changes.
 * @param {function} onClick onClick() callback called when user clicks on the button next to the question.
 * @param {string} className Top-level component class. Defaults to 'template-question'.
 * @param {string} placeholder Textarea placholder. Default to 'Enter text...'.
 * @param {*} children Contents of the button. Can be any markup. Defaults to 'Go'.
 */
export default function TemplateQuestion({ question, onChange, onClick, className, placeholder, children }) {
  if (!onChange) throw new Error('onChange callback not defined.');
  if (!onClick) throw new Error('onClick callback not defined.');
  return (
    <div className={className ?? 'template-question'}>
      <AutoGrowTextarea
        placeholder={placeholder ?? 'Enter text...'}
        onChange={onChange}
        value={question}
      />
      <Button onClick={onClick} className='action-button'>
        {children ?? 'Go'}
      </Button>
    </div>
  );
}
