import QuestionWithAnswer from './QuestionWithAnswer';
import Button from '../shared/Button';

/**
 * Questionnaire editor component
 * @param {object} questionnaire Questionnaire.
 * @param {function} onAnswer onAnswer(id: string, modifiedAnswer: string) callback function called when changing answer text.
 * @param {function} onComplete onComplete(id: string) callback function called when completing the questionnaire.
 */
export default function QuestionnaireEditor(props) {
  const questionnaire = props.questionnaire;
  if (!questionnaire) {
    throw new Error('Questionnaire must be given.');
  }
  const onAnswer = props.onAnswer;
  if (!onAnswer) {
    throw new Error('onAnswer callback not given.');
  }
  const onComplete = props.onComplete;
  if (!onComplete) {
    throw new Error(`onComplete callback not given.`);
  }
  const questions = questionnaire.questions;
  const answers = questions.map((question) => {
    return (
      <QuestionWithAnswer
        key={question.id}
        question={question.text}
        answer={question.answer}
        onChange={(modifiedAnswer) =>
          onAnswer(question.id, modifiedAnswer)
        }
      />
    );
  });
  return (
    <div className='questionnaire-editor'>
      {answers}
      <Button onClick={onComplete}>Complete</Button>
    </div>
  );
}
