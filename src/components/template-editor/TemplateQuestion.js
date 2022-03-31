import Button from '../shared/Button';

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
