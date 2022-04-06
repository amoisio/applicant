import Button from '../shared/Button';

/**
 * Landing page navigation component.
 * @param {any[]} openQuestionnaires Open questionnaires.
 * @param {function} onOpenQuestionnaire onOpenQuestionnaire(id: string) callback called when clicking on the questionnaire's button.
 * @param {function} onCreateQuestionnaire onCreateQuestionnaire(title: string) callback called when clicking on the 'New' button.
 * @param {function} onOpenTemplate onOpenTemplate() callback called when clicking on the 'Template' button.
 * @param {function} onOpenArchive onOpenArchive() callback called when clicking on the 'Archive' button.
 */
export default function Navigation(props) {
  const questionnaires = props.openQuestionnaires.map(q => {
    return <Button onClick={() => props.onOpenQuestionnaire(q)}>{q.title}</Button>
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
