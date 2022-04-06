import QuestionWithAnswer from './QuestionWithAnswer';
import ViewTitle from '../shared/ViewTitle';

/**
 * Questionnaire editor component
 * @param {object} questionnaireRepository Questionnaire repository.
 * @param {string} id Questionnaire id.
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
  const title = questionnaire.title;
  const questions = questionnaire.questions;
  const elements = questions.map((question) => {
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
    <div id='questionnaire'>
      <ViewTitle>{title}</ViewTitle>
      {elements}
      <Button onClick={onComplete}>Complete</Button>
    </div>
  );
}
