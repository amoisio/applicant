import { trimmedOrDefault } from '../../models/common';
import AutoGrowTextarea from '../shared/AutoGrowTextarea';

/**
 * Questionnaire question with an answer component for answering a questionnaire question.
 * @param {string} question Question text.
 * @param {string} answer Answer text.
 * @param {function} onChange onChange(modifiedAnswer: string) callback called when answer text changes.
 */
export default function QuestionWithAnswer({ question, answer, onChange }) {
  const questionText = trimmedOrDefault(question);
  if (!questionText)  throw new Error('Non-empty question must be given.');
  if (!onChange)      throw new Error('onChange callback not defined.');

  const checkmark =
    answer && answer.length > 0 ? (
      <div className='checkmark answered'>
        <span className='bi-check'></span>
      </div>
    ) : (
      <div className='checkmark'>
        <span className='bi-x'></span>
      </div>
    );

  return (
    <div className='questionnaire-question'>
      <p>{questionText}</p>
      <AutoGrowTextarea
        placeholder='Enter answer text...'
        onChange={onChange}
        value={answer} />
      {checkmark}
    </div>
  );
}
