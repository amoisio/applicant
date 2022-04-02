import { trimmedOrDefault } from '../../models/common';
/**
 * Questionnaire question with answer component for answering questionnaire question.
 * @param {string} question Question text.
 * @param {string} answer Answer text.
 * @param {function} onChange onChange(modifiedAnswer: string) callback called when answer text changes.
 */
export default function QuestionWithAnswer(props) {
  const onChange = props.onChange;
  if (!onChange) {
    throw new Error('onChange callback not defined.');
  }
  const question = trimmedOrDefault(props.question);
  if (!question) {
    throw new Error('Non-empty question must be given.');
  }
  const answer = props.answer;
  return (
    <div className='questionnaire-question'>
      <p>{question}</p>
      <input
        type='text'
        value={answer}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
