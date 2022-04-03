import { trimmedOrDefault } from '../../models/common';
import QuestionText from './QuestionText';
/**
 * Questionnaire question with an answer component for answering a questionnaire question.
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
      <QuestionText question={question}></QuestionText>
      <input
        type='text'
        value={answer}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
