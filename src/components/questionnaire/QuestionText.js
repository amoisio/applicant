import { trimmedOrDefault } from '../../models/common';
/**
 * Question text component used for rendering the question text on the questionnaire.
 * @param {string} question Question text.
 */
export default function QuestionText(props) {
  const question = trimmedOrDefault(props.question);
  if (!question) {
    throw new Error('Non-empty question must be given.');
  }
  return (
    <p>{question}</p>
  );
}
