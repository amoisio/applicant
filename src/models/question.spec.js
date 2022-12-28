import Question from './question';

describe('Question', () => {
  it('should construct correctly with an empty answer', () => {
    const question = Question.create('is it really?', 'my-id');

    console.log(question);
    expect(question.id).toBe('my-id');
    expect(question.text).toBe('is it really?');
    expect(question.answer).toBeNull();
    expect(question.isAnswered).toBeFalsy();
  });

  it('should construct correctly with an answer', () => {
    const question = Question.create('is it really?', 'my-id', 'yes it is');

    expect(question.id).toBe('my-id');
    expect(question.text).toBe('is it really?');
    expect(question.answer).toBe('yes it is');
    expect(question.isAnswered).toBeTruthy();
  });

  it('should return an answered question when calling answer', () => {
    const question = Question.create('is this?', 'my-id');

    const answeredQuestion = Question.answer('not really', question);

    expect(question.isAnswered).toBeFalsy();
    expect(answeredQuestion.isAnswered).toBeTruthy();
    expect(answeredQuestion.answer).toBe('not really');
  });
});
