import Button from '../shared/Button';

export default function Question(props) {
  return (
    <div className='template-question'>
      <input
        type='text'
        onChange={(e) => props.onChange(e.target.value)}
        value={props.question.text}
      />
      <Button onClick={(e) => props.onRemove(props.question, e)}>Remove</Button>
    </div>
  );
}
