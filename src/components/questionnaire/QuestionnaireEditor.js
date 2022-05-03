import QuestionWithAnswer from './QuestionWithAnswer';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import Questionnaire from '../../models/questionnaire';

/**
 * Questionnaire editor component
 * @param {object} questionnaire Questionnaire.
 * @param {function} onChange onChange(questionnaire: object) callback function called when questionnaire changes.
 */
export default function QuestionnaireEditor({ questionnaire, onChange }) {
  if (!questionnaire) throw new Error('Questionnaire must be given.');
  if (!onChange)      throw new Error('onChange callback not given.');

  const updateAnswer = (id, modifiedAnswer) => {
    const modifiedQuestionnaire = Questionnaire.answer(id, modifiedAnswer, questionnaire);
    onChange(modifiedQuestionnaire);
  }
  const completeQuestionnaire = () => {
    const questionnaire = this.state.questionnaire;
    const modifiedQuestionnaire = Questionnaire.complete(questionnaire);
    onChange(modifiedQuestionnaire);
  }

  const answers = questionnaire.questions.map((question) => {
    return (
      <QuestionWithAnswer
        key={question.id}
        question={question.text}
        answer={question.answer}
        onChange={(modifiedAnswer) => updateAnswer(question.id, modifiedAnswer)} />
    );
  });
  return (
    <div className='questionnaire-editor'>
      {answers}
      <Button onClick={completeQuestionnaire} className='complete-button'>
        <Icon icon='check' />
      </Button>
    </div>
  );
}
