import QuestionWithAnswer from './QuestionWithAnswer';

/**
 * Questionnaire editor component
 * @param {object} questionnaire Questionnaire.
 * @param {function} onAnswer onAnswer(id: string, modifiedAnswer: string) callback function called when changing answer text.
 */
export default function QuestionnaireEditor({ questionnaire, onAnswer }) {
  if (!questionnaire) throw new Error('Questionnaire must be given.');
  if (!onAnswer)      throw new Error('onAnswer callback not given.');
  const answers = questionnaire.questions.map((question) => {
    return (
      <QuestionWithAnswer
        key={question.id}
        question={question.text}
        answer={question.answer}
        onChange={(modifiedAnswer) => onAnswer(question.id, modifiedAnswer)} />
    );
  });
  return (
    <div className='questionnaire-editor'>
      {answers}
    </div>
  );
}
