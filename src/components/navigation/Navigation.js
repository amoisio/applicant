import Button from '../shared/Button';

export default function Navigation(props) {
  const questionnaires = props.openQuestionnaires.map(q => {
    return <Button onClick={() => props.onOpenQuestionnaire(q.id)}>{q.title}</Button>
  });
  return (
    <div className='navigation'>
      {questionnaires}
      <Button onClick={() => props.onCreateQuestionnaire('New')}>New</Button>
      <Button onClick={props.onOpenTemplate}>Template</Button>
      <Button onClick={props.onOpenArchive}>Archive</Button>
    </div>
  );
}
